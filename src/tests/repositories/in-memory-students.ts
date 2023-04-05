import {
  CreateStudentData,
  StudentRepository,
  UpdateStudentData,
} from '../../application/repositories/student';
import { Student } from '../../domain/entities/student';

export class InMemoryStudentRepository implements StudentRepository {
  public students: Student[] = [];

  async create(student: CreateStudentData, id?: string): Promise<void> {
    this.students.push(
      Student.create(
        {
          email: student.email,
          name: student.name,
        },
        id
      )
    );
  }

  async get(): Promise<Student[]> {
    return this.students;
  }

  async getById(id: string): Promise<Student | null> {
    return this.students.find((student) => student.id === id) ?? null;
  }

  async update(id: string, data: UpdateStudentData): Promise<void> {
    this.students.forEach((student) => {
      if (student.id === id) {
        student.props = {
          name: data.name,
          email: data.email,
        };
      }
    });
  }
}
