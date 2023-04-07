import { Student } from '../../domain/entities/student';
import { GetStudentById } from '../../domain/use-cases/student';
import { StudentRepository } from '../repositories/student';

export class DbGetStudentById implements GetStudentById {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string): Promise<Student | null> {
    const student = await this.studentRepository.getById(id);
    return student;
  }
}
