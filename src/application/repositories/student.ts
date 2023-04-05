import { Student } from '../../domain/entities/student';

export interface CreateStudentData {
  name: string;
  email: string;
}

export interface UpdateStudentData {
  name: string;
  email: string;
}

export interface StudentRepository {
  create(obj: CreateStudentData): Promise<void>;
  get(): Promise<Student[]>;
  getById(id: string): Promise<Student | null>;
  update(id: string, data: UpdateStudentData): Promise<void>;
}
