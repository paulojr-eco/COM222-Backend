import { describe, expect, it } from 'vitest';
import { InMemoryStudentRepository } from '../../tests/repositories/in-memory-students';
import { GetStudents } from './get-students';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new GetStudents(inMemoryStudentRepository);
  return {
    sut,
    studentRepository: inMemoryStudentRepository,
  };
};

const makeStudents = async (studentRepository: InMemoryStudentRepository) => {
  studentRepository.create({
    email: 'student1@example.com',
    name: 'student1',
  });
  studentRepository.create({
    email: 'student2@example.com',
    name: 'student2',
  });
  studentRepository.create({
    email: 'student@example.com',
    name: 'student2',
  });
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
            name: 'student1',
            email: 'student1@example.com',
          },
        }),
      ])
    );
  });
});
