import { describe, expect, it, vi } from 'vitest';
import { InMemoryStudentRepository } from '../../tests/repositories/in-memory-students';
import { DeleteStudent } from './delete-student';

const makeSut = () => {
  const inMemoryStudentRepository = new InMemoryStudentRepository();
  const sut = new DeleteStudent(inMemoryStudentRepository);
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

describe('Delete student use case', () => {
  it('should throw if an invalid id was provided', async () => {
    const { sut } = makeSut();
    const promise = sut.execute('id');
    expect(promise).rejects.toThrow();
  });

  it('should call StudentRepository with correct values', async () => {
    const { sut, studentRepository } = makeSut();
    await makeStudents(studentRepository);
    const deleteSpy = vi.spyOn(studentRepository, 'delete');
    await sut.execute('id1');
    expect(deleteSpy).toHaveBeenCalledWith('id1');
  });

  it('should delete a student on success', async () => {
    const { studentRepository, sut } = makeSut();
    await makeStudents(studentRepository);
    await sut.execute('id1');
    expect(studentRepository.students).not.toEqual(
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
