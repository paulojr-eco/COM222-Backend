import { describe, expect, it } from 'vitest';
import { InMemoryStudentRepository } from '../../tests/repositories/in-memory-students';
import { CreateStudent } from './create-student';

describe('Create student use case', () => {
  it('should create a new student', async () => {
    const inMemoryStudentRepository = new InMemoryStudentRepository();
    const sut = new CreateStudent(inMemoryStudentRepository);
    await sut.execute({
      name: 'student',
      email: 'student@example.com',
    });
    expect(inMemoryStudentRepository.students.length).toBe(1);
  });
});
