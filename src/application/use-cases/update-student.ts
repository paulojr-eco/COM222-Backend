import { UpdateStudent } from '../../domain/use-cases/student';
import { StudentRepository, UpdateStudentData } from '../repositories/student';

export class DbUpdateStudent implements UpdateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(id: string, data: UpdateStudentData): Promise<void> {
    const student = await this.studentRepository.getById(id);
    if (!student) {
      throw new Error('Student not found');
    }
    this.studentRepository.update(id, data);
  }
}
