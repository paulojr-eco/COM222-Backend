export interface CreateStudentData {
  name: string;
  email: string;
}

export interface StudentRepository {
  create(obj: CreateStudentData): Promise<void>;
}
