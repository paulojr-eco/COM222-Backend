import { describe, expect, it } from 'vitest';

import { InMemoryStudentRepository } from '@application/repositories/in-memory/in-memory-students';
import { DbGetStudents } from './get-students';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbGetStudents(inMemoryStudentRepository);
  return {
    sut,
    studentRepository: inMemoryStudentRepository,
  };
};

const makeStudents = async (studentRepository: InMemoryStudentRepository) => {
  studentRepository.create(
    {
      email: 'student1@example.com',
      nome: 'student1',
    },
    'id1'
  );
  studentRepository.create(
    {
      email: 'student2@example.com',
      nome: 'student2',
    },
    'id2'
  );
  studentRepository.create(
    {
      email: 'student3@example.com',
      nome: 'student3',
    },
    'id3'
  );
};

describe('Get students use case', () => {
  it('should get an empty array of students if no student were created', async () => {
    const { sut } = makeSut();
    const results = await sut.execute();
    expect(results.length).toEqual(0);
    expect(results).toEqual(expect.arrayContaining([]));
  });

  it('should get an array of students on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    const results = await sut.execute();
    expect(results.length).toEqual(3);
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            nome: 'student1',
            email: 'student1@example.com',
          },
        }),
      ])
    );
  });
});
