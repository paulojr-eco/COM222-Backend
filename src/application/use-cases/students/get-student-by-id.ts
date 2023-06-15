import { StudentRepository } from '@application/repositories/student';
import { Student } from '@domain/entities/student';
import { GetStudentById } from '@domain/use-cases/student';

export class DbGetStudentById implements GetStudentById {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string): Promise<Student | null> {
    const student = await this.studentRepository.getById(id);
    return student;
  }
}
