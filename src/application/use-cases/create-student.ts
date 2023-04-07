import { CreateStudent } from '../../domain/use-cases/student';
import { CreateStudentData, StudentRepository } from '../repositories/student';

export class DbCreateStudent implements CreateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute({ email, name }: CreateStudentData): Promise<void> {
    await this.studentRepository.create({
      email,
      name,
    });
  }
}
