import { describe, expect, it, vi } from 'vitest';
import { InMemoryStudentRepository } from '../../tests/repositories/in-memory-students';
import { DbCreateStudent } from './create-student';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DbCreateStudent(inMemoryStudentRepository);
  return {
    sut,
    studentRepository: inMemoryStudentRepository,
  };
};

describe('Create student use case', () => {
  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    const createSpy = vi.spyOn(studentRepository, 'create');
    await sut.execute({
      name: 'student',
      email: 'student@example.com',
    });
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'student',
        email: 'student@example.com',
      })
    );
  });

  it('should create a new student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await sut.execute({
      name: 'student',
      email: 'student@example.com',
    });
    expect(studentRepository.students.length).toBe(1);
    expect(studentRepository.students[0]).toEqual(
      expect.objectContaining({
        props: {
          name: 'student',
          email: 'student@example.com',
        },
      })
    );
  });
});
