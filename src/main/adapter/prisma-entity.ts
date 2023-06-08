import { Student } from '@domain/entities/student';
import { Student as PrismaStudent } from '@prisma/client';

export const prismaAdapterStudent = (prismaStudent: PrismaStudent): Student => {
  const {
    email,
    id,
    nome,
    CPF,
    RG,
    emailResponsavel,
    endereco,
    matricula,
    nascimento,
    nomeMae,
    nomePai,
    serie,
    sexo,
    status,
    telefoneMae,
    telefonePai,
  } = prismaStudent;
  const student = Student.create(
    {
      email,
      nome,
      CPF,
      emailResponsavel,
      endereco,
      matricula,
      nascimento,
      nomeMae,
      nomePai,
      RG,
      serie,
      sexo,
      status,
      telefoneMae,
      telefonePai,
    },
    id
  );
  return student;
};
