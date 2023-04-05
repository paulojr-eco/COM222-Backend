import { Student } from '../../domain/entities/student';
import { StudentRepository } from '../repositories/student';

interface ICreateStudentParams {
  name: string;
  email: string;
}

export class CreateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute({ email, name }: ICreateStudentParams): Promise<void> {
    const student = Student.create({ email, name });
    await this.studentRepository.add(student);
  }
}
