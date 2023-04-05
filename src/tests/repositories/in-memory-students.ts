import crypto from 'crypto';
import {
  CreateStudentData,
  StudentRepository,
} from '../../application/repositories/student';
import { type Student } from '../../domain/entities/student';

export class InMemoryStudentRepository implements StudentRepository {
  public students: Student[] = [];

  async create(student: CreateStudentData): Promise<void> {
    this.students.push({
      id: crypto.randomUUID(),
      props: {
        email: student.email,
        name: student.name,
      },
    });
  }

  async get(): Promise<Student[]> {
    return this.students;
  }
}
