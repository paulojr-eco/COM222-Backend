import { Student } from '@domain/entities/student';
import { Student as PrismaStudent } from '@prisma/client';

export const prismaAdapterStudent = (prismaStudent: PrismaStudent): Student => {
  const { email, id, nome } = prismaStudent;
  const student = Student.create({ email, nome }, id);
  return student;
};
