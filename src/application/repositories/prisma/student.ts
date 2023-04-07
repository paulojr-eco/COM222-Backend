import { Student } from '../../../domain/entities/student';
import prisma from '../../../main/config/prisma';
import {
  CreateStudentData,
  StudentRepository,
  UpdateStudentData,
} from '../student';

export class PrismaStudentRepository implements StudentRepository {
  async create(data: CreateStudentData): Promise<void> {
    await prisma.student.create({
      data: {
        email: data.email,
        nome: data.name,
      },
    });
  }

  get(): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }

  getById(id: string): Promise<Student | null> {
    throw new Error('Method not implemented.');
  }

  update(id: string, data: UpdateStudentData): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
