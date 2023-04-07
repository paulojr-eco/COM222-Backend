import { DeleteStudent } from '../../domain/use-cases/student';
import { StudentRepository } from '../repositories/student';

export class DbDeleteStudent implements DeleteStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string): Promise<void> {
    const student = await this.studentRepository.getById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    await this.studentRepository.delete(id);
  }
}
