import { describe, expect, it, vi } from 'vitest';
import { InMemoryStudentRepository } from '../../tests/repositories/in-memory-students';
import { GetStudentById } from './get-student-by-id';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new GetStudentById(inMemoryStudentRepository);
  return {
    sut,
    studentRepository: inMemoryStudentRepository,
  };
};

const makeStudents = async (studentRepository: InMemoryStudentRepository) => {
  studentRepository.create(
    {
      email: 'student1@example.com',
      name: 'student1',
    },
    'id1'
  );
  studentRepository.create(
    {
      email: 'student2@example.com',
      name: 'student2',
    },
    'id3'
  );
  studentRepository.create(
    {
      email: 'student3@example.com',
      name: 'student3',
    },
    'id3'
  );
};

describe('Get student by id use case', () => {
  it('should get null if no student were found', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('id');
    expect(result).toEqual(null);
  });

  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    await makeStudents(studentRepository);
    const getSpy = vi.spyOn(studentRepository, 'getById');
    await sut.execute('id1');
    expect(getSpy).toHaveBeenCalledWith('id1');
  });

  it('should get a student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    const result = await sut.execute('id1');
    expect(result).toEqual(
      expect.objectContaining({
        props: {
          name: 'student1',
          email: 'student1@example.com',
        },
      })
    );
  });
});
