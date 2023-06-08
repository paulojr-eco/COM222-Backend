import { describe, expect, test, vi } from 'vitest';

import { ServerError } from '@application/errors';
import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { StudentRepository } from '@application/repositories/student';
import { Student } from '@domain/entities/student';
import { GetStudents } from '@domain/use-cases/student';
import { GetStudentsController } from './get-students';

const makeGetStudents = (studentRepository: StudentRepository): GetStudents => {
  class GetStudentsStub implements GetStudents {
    constructor(private studentRepository: StudentRepository) {}
    async execute(): Promise<Student[]> {
      return await Promise.resolve([]);
    }
  }
  return new GetStudentsStub(studentRepository);
};

interface SutTypes {
  sut: GetStudentsController;
  getStudents: GetStudents;
}

const makeSut = (): SutTypes => {
  const studentRepository = new InMemoryStudentRepository();
  const getStudents = makeGetStudents(studentRepository);
  const sut = new GetStudentsController(getStudents);
  return {
    sut,
    getStudents,
  };
};

describe('Get Student Controller', () => {
  test('should call GetStudents', async () => {
    const { sut, getStudents } = makeSut();
    const getStudentsSpy = vi.spyOn(getStudents, 'execute');
    await sut.handle();
    expect(getStudentsSpy).toHaveBeenCalled();
  });

  test('should return 500 if GetStudents throws', async () => {
    const { sut, getStudents } = makeSut();
    vi.spyOn(getStudents, 'execute').mockImplementationOnce(async () => {
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
