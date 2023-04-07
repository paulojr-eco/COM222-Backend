import { CreateStudentController } from '../../application/controllers/create-student';
import { PrismaStudentRepository } from '../../application/repositories/prisma/student';
import { CreateStudent } from '../../application/use-cases/create-student';

export const makeCreateStudentController = (): CreateStudentController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const createStudent = new CreateStudent(prismaStudentRepository);
  return new CreateStudentController(createStudent);
};
