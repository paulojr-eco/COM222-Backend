import { Student } from '../../domain/entities/student';
import { GetStudents } from '../../domain/use-cases/student';
import { StudentRepository } from '../repositories/student';

export class DbGetStudents implements GetStudents {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<Student[]> {
    const students = await this.studentRepository.get();
    return students;
  }
}
