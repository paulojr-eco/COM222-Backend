import { Student } from '../../domain/entities/student';
import { StudentRepository } from '../repositories/student';

export class GetStudents {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<Student[]> {
    const students = await this.studentRepository.get();
    return students;
  }
}
