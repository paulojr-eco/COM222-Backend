import { Entity } from '@core/domain/entity';

export interface IStudent {
  nome: string;
  email: string;
}

export class Student extends Entity<IStudent> {
  private constructor(props: IStudent, id?: string) {
    super(props, id);
  }

  static create(props: IStudent, id?: string) {
    const student = new Student(props, id);
    return student;
  }
}
