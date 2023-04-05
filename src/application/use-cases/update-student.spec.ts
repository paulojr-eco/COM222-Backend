import { describe, expect, it, vi } from 'vitest';
import { InMemoryStudentRepository } from '../../tests/repositories/in-memory-students';
import { UpdateStudent } from './update-student';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new UpdateStudent(inMemoryStudentRepository);
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

describe('Update student use case', () => {
  it('should throw if an invalid id was provided', async () => {
    const { sut } = makeSut();
    const promise = sut.execute('id', {
      email: 'student@example.com',
      name: 'student',
    });
    expect(promise).rejects.toThrow();
  });

  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    await makeStudents(studentRepository);
    const updateSpy = vi.spyOn(studentRepository, 'update');
    await sut.execute('id1', {
      name: 'student',
      email: 'student@example.com',
    });
    expect(updateSpy).toHaveBeenCalledWith('id1', {
      name: 'student',
      email: 'student@example.com',
    });
  });

  it('should update a student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    await sut.execute('id1', {
      email: 'student@example.com',
      name: 'student',
    });
    expect(studentRepository.students).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: {
            name: 'student',
            email: 'student@example.com',
          },
        }),
      ])
    );
  });
});
