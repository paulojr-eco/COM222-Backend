import {
  EmployeeRepository,
  UpdateEmployeeData,
} from '@application/repositories/employee';
import { UpdateEmployee } from '@domain/use-cases/employee';

export class DbUpdateEmployee implements UpdateEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: string, data: UpdateEmployeeData): Promise<void> {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    this.employeeRepository.update(id, data);
  }
}
