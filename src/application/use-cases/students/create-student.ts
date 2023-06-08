import {
  CreateStudentData,
  StudentRepository,
} from '@application/repositories/student';
import { CreateStudent } from '@domain/use-cases/student';

export class DbCreateStudent implements CreateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute({
    email,
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
  }: CreateStudentData): Promise<void> {
    await this.studentRepository.create({
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
    });
  }
}
