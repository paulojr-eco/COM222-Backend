import { EmployeeRepository } from '@application/repositories/employee';
import { Employee } from '@domain/entities/employee';
import { GetEmployees } from '@domain/use-cases/employee';

export class DbGetEmployees implements GetEmployees {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(): Promise<Employee[]> {
    const employees = await this.employeeRepository.get();
    return employees;
  }
}
