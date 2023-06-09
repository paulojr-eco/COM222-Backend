import { describe, expect, test, vi } from 'vitest';

import { MissingParamError, ServerError } from '@application/errors';
import { EmployeeRepository } from '@application/repositories/employee';
import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { Employee } from '@domain/entities/employee';
import { GetEmployeeById } from '@domain/use-cases/employee';
import { GetEmployeeByIdController } from './get-employee-by-id';

const makeGetEmployeeById = (
  employeeRepository: EmployeeRepository
): GetEmployeeById => {
  class GetEmployeeByIdStub implements GetEmployeeById {
    constructor(private employeeRepository: EmployeeRepository) {}
    async execute(id: string): Promise<Employee | null> {
      return await Promise.resolve(null);
    }
  }
  return new GetEmployeeByIdStub(employeeRepository);
};

interface SutTypes {
  sut: GetEmployeeByIdController;
  getEmployeeById: GetEmployeeById;
}

const makeSut = (): SutTypes => {
  const employeeRepository = new InMemoryEmployeeRepository();
  const getEmployeeById = makeGetEmployeeById(employeeRepository);
  const sut = new GetEmployeeByIdController(getEmployeeById);
  return {
    sut,
    getEmployeeById,
  };
};

describe('Get Employee By Id Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call GetEmployeeById with correct values', async () => {
    const { sut, getEmployeeById } = makeSut();
    const getEmployeeByIdSpy = vi.spyOn(getEmployeeById, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    await sut.handle(httpRequest);
    expect(getEmployeeByIdSpy).toHaveBeenCalledWith('id');
  });

  test('should return 500 if GetEmployeeById throws', async () => {
    const { sut, getEmployeeById } = makeSut();
    vi.spyOn(getEmployeeById, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error(''));
    });
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return null if no Employee were found', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.body).toBe(null);
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });
});
