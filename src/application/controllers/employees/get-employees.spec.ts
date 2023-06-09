import { describe, expect, test, vi } from 'vitest';

import { ServerError } from '@application/errors';
import { EmployeeRepository } from '@application/repositories/employee';
import { InMemoryEmployeeRepository } from '@application/repositories/in-memory/in-memory-employees';
import { Employee } from '@domain/entities/employee';
import { GetEmployees } from '@domain/use-cases/employee';
import { GetEmployeesController } from './get-employees';

const makeGetEmployees = (
  employeeRepository: EmployeeRepository
): GetEmployees => {
  class GetEmployeesStub implements GetEmployees {
    constructor(private employeeRepository: EmployeeRepository) {}
    async execute(): Promise<Employee[]> {
      return await Promise.resolve([]);
    }
  }
  return new GetEmployeesStub(employeeRepository);
};

interface SutTypes {
  sut: GetEmployeesController;
  getEmployees: GetEmployees;
}

const makeSut = (): SutTypes => {
  const employeeRepository = new InMemoryEmployeeRepository();
  const getEmployees = makeGetEmployees(employeeRepository);
  const sut = new GetEmployeesController(getEmployees);
  return {
    sut,
    getEmployees,
  };
};

describe('Get Employee Controller', () => {
  test('should call GetEmployees', async () => {
    const { sut, getEmployees } = makeSut();
    const getEmployeesSpy = vi.spyOn(getEmployees, 'execute');
    await sut.handle();
    expect(getEmployeesSpy).toHaveBeenCalled();
  });

  test('should return 500 if GetEmployees throws', async () => {
    const { sut, getEmployees } = makeSut();
    vi.spyOn(getEmployees, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error(''));
    });
    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toBe(200);
  });
});
