import { describe, expect, test, vi } from 'vitest';
import { Student } from '../../domain/entities/student';
import { GetStudentById } from '../../domain/use-cases/student';
import { MissingParamError, ServerError } from '../errors';
import { InMemoryStudentRepository } from '../repositories/in-memory/in-memory-students';
import { StudentRepository } from '../repositories/student';
import { GetStudentByIdController } from './get-student-by-id';

const makeGetStudentById = (
  studentRepository: StudentRepository
): GetStudentById => {
  class GetStudentByIdStub implements GetStudentById {
    constructor(private studentRepository: StudentRepository) {}
    async execute(id: string): Promise<Student | null> {
      return await Promise.resolve(null);
    }
  }
  return new GetStudentByIdStub(studentRepository);
};

interface SutTypes {
  sut: GetStudentByIdController;
  getStudentById: GetStudentById;
}

const makeSut = (): SutTypes => {
  const studentRepository = new InMemoryStudentRepository();
  const getStudentById = makeGetStudentById(studentRepository);
  const sut = new GetStudentByIdController(getStudentById);
  return {
    sut,
    getStudentById,
  };
};

describe('Get Student By Id Controller', () => {
  test('should return 400 if no id is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('id'));
  });

  test('should call GetStudentById with correct values', async () => {
    const { sut, getStudentById } = makeSut();
    const getStudentByIdSpy = vi.spyOn(getStudentById, 'execute');
    const httpRequest = {
      params: {
        id: 'id',
      },
    };
    await sut.handle(httpRequest);
    expect(getStudentByIdSpy).toHaveBeenCalledWith('id');
  });

  test('should return 500 if GetStudentById throws', async () => {
    const { sut, getStudentById } = makeSut();
    vi.spyOn(getStudentById, 'execute').mockImplementationOnce(async () => {
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

  test('should return null if no Student were found', async () => {
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
