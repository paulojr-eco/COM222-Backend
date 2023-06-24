import {
  AccountRepository,
  CreateAccountData,
} from '@application/repositories/account';
import { CreateAccount } from '@domain/use-cases/account';

export class DbCreateAccount implements CreateAccount {
  constructor(private accountRepository: AccountRepository) {}

  async execute({ email, password }: CreateAccountData): Promise<void> {
    await this.accountRepository.create({
      email,
      password,
    });
  }
}
