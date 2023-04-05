import { StudentRepository } from '../repositories/student';

export class DeleteStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string): Promise<void> {
    const student = await this.studentRepository.getById(id);
    if (!student) {
      throw new Error('User not found');
    }
    await this.studentRepository.delete(id);
  }
}
