import { type AccountModel } from '../../../domain/models/account';
import {
  type AddAccount,
  type AddAccountModel,
} from '../../../domain/use-cases/add-account';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { type Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );
    return account;
  }
}
