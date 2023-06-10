import { EmployeeRepository } from '@application/repositories/employee';
import { Employee } from '@domain/entities/employee';
import { GetEmployeeById } from '@domain/use-cases/employee';

export class DbGetEmployeeById implements GetEmployeeById {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<Employee | null> {
    const employee = await this.employeeRepository.getById(id);
    return employee;
  }
}
