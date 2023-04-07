import { describe, expect, test, vi } from 'vitest';
import { CreateStudent } from '../../domain/use-cases/student';
import { MissingParamError, ServerError } from '../errors';
import { InMemoryStudentRepository } from '../repositories/in-memory/in-memory-students';
import { CreateStudentData, StudentRepository } from '../repositories/student';
import { CreateStudentController } from './create-student';

const makeCreateStudent = (
  studentRepository: StudentRepository
): CreateStudent => {
  class CreateStudentStub implements CreateStudent {
    constructor(private studentRepository: StudentRepository) {}
    async execute(data: CreateStudentData): Promise<void> {
      return await Promise.resolve();
    }
  }
  return new CreateStudentStub(studentRepository);
};

interface SutTypes {
  sut: CreateStudentController;
  createStudent: CreateStudent;
}

const makeSut = (): SutTypes => {
  const studentRepository = new InMemoryStudentRepository();
  const createStudent = makeCreateStudent(studentRepository);
  const sut = new CreateStudentController(createStudent);
  return {
    sut,
    createStudent,
  };
};

describe('Create Student Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('nome'));
  });

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        nome: 'nome',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('should call CreateStudent with correct values', async () => {
    const { sut, createStudent } = makeSut();
    const createStudentSpy = vi.spyOn(createStudent, 'execute');
    const httpRequest = {
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    await sut.handle(httpRequest);
    expect(createStudentSpy).toHaveBeenCalledWith({
      nome: 'nome',
      email: 'email@example.com',
    });
  });

  test('should return 500 if CreateStudent throws', async () => {
    const { sut, createStudent } = makeSut();
    vi.spyOn(createStudent, 'execute').mockImplementationOnce(async () => {
      return await Promise.reject(new Error(''));
    });
    const httpRequest = {
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 201 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        nome: 'nome',
        email: 'email@example.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });
});
