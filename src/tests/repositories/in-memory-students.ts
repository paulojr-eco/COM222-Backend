import { StudentRepository } from '../../application/repositories/student';
import { Student } from '../../domain/entities/student';

export class InMemoryStudentRepository implements StudentRepository {
  public students: Student[] = [];

  async add(student: Student): Promise<void> {
    await Promise.resolve(this.students.push(student));
  }
}
