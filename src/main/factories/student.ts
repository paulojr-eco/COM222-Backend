import { CreateStudentController } from '@application/controllers/create-student';
import { DeleteStudentController } from '@application/controllers/delete-student';
import { GetStudentByIdController } from '@application/controllers/get-student-by-id';
import { GetStudentsController } from '@application/controllers/get-students';
import { UpdateStudentController } from '@application/controllers/update-student';
import { PrismaStudentRepository } from '@application/repositories/prisma/student';
import { DbCreateStudent } from '@application/use-cases/create-student';
import { DbDeleteStudent } from '@application/use-cases/delete-student';
import { DbGetStudentById } from '@application/use-cases/get-student-by-id';
import { DbGetStudents } from '@application/use-cases/get-students';
import { DbUpdateStudent } from '@application/use-cases/update-student';

export const makeCreateStudentController = (): CreateStudentController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const createStudent = new DbCreateStudent(prismaStudentRepository);
  return new CreateStudentController(createStudent);
};

export const makeGetStudentsController = (): GetStudentsController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const getStudents = new DbGetStudents(prismaStudentRepository);
  return new GetStudentsController(getStudents);
};

export const makeGetStudentByIdController = (): GetStudentByIdController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const getStudentById = new DbGetStudentById(prismaStudentRepository);
  return new GetStudentByIdController(getStudentById);
};

export const makeUpdateStudentController = (): UpdateStudentController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const updateStudent = new DbUpdateStudent(prismaStudentRepository);
  return new UpdateStudentController(updateStudent);
};

export const makeDeleteStudentController = (): DeleteStudentController => {
  const prismaStudentRepository = new PrismaStudentRepository();
  const deleteStudent = new DbDeleteStudent(prismaStudentRepository);
  return new DeleteStudentController(deleteStudent);
};
