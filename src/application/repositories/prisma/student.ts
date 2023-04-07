import { Student } from '../../../domain/entities/student';
import { prismaAdapterStudent } from '../../../main/adapter/prisma-entity';
import prisma from '../../../main/config/prisma';
import {
  CreateStudentData,
  StudentRepository,
  UpdateStudentData,
} from '../student';

export class PrismaStudentRepository implements StudentRepository {
  async create(data: CreateStudentData): Promise<void> {
    const { email, nome } = data;
    await prisma.student.create({
      data: {
        email,
        nome,
      },
    });
  }

  async get(): Promise<Student[]> {
    const prismaStudents = await prisma.student.findMany();
    const students = prismaStudents.map(prismaAdapterStudent);
    return students;
  }

  async getById(id: string): Promise<Student | null> {
    const prismaStudent = await prisma.student.findUnique({
      where: { id },
    });
    if (!prismaStudent) {
      return null;
    }
    const student = prismaAdapterStudent(prismaStudent);
    return student;
  }

  async update(id: string, data: UpdateStudentData): Promise<void> {
    const { email, nome } = data;
    await prisma.student.update({
      where: { id },
      data: {
        email,
        nome,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.student.delete({
      where: { id },
    });
  }
}
