import { Student as PrismaStudent } from '@prisma/client';
import { Student } from '../../domain/entities/student';

export const prismaAdapterStudent = (prismaStudent: PrismaStudent): Student => {
  const { email, id, nome } = prismaStudent;
  const student = Student.create({ email, nome }, id);
  return student;
};
