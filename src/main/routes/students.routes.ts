import { type Router } from 'express';
import { PrismaStudentRepository } from '../../application/repositories/prisma/student';
import { CreateStudent } from '../../application/use-cases/create-student';

export default (router: Router): void => {
  router.post('/alunos', async (req, res) => {
    const { nome: name, email } = req.body;

    const prismaStudentRepository = new PrismaStudentRepository();
    const createStudent = new CreateStudent(prismaStudentRepository);

    try {
      await createStudent.execute({ email, name });

      return res.status(201).send();
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  });
};
