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
  create(data: CreateStudentData): Promise<void>;
  get(): Promise<Student[]>;
  getById(id: string): Promise<Student | null>;
  update(id: string, data: UpdateStudentData): Promise<void>;
  delete(id: string): Promise<void>;
}
