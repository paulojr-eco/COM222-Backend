import { StudentRepository, UpdateStudentData } from '../repositories/student';

export class UpdateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string, data: UpdateStudentData): Promise<void> {
    const student = await this.studentRepository.getById(id);
    if (!student) {
      throw new Error('User not found');
    }
    await this.studentRepository.update(id, data);
  }
}
