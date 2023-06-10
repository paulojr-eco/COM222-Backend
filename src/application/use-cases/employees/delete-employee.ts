import { EmployeeRepository } from '@application/repositories/employee';
import { DeleteEmployee } from '@domain/use-cases/employee';

export class DbDeleteEmployee implements DeleteEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<void> {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    await this.employeeRepository.delete(id);
  }
}
