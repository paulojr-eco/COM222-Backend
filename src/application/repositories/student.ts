import { Student } from '../../domain/entities/student';

export interface StudentRepository {
  add(obj: Student): Promise<void>;
}
