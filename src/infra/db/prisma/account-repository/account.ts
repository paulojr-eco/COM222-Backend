import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { type AccountModel } from '../../../../domain/models/account';
import { type AddAccountModel } from '../../../../domain/use-cases/add-account';

export class PrismaAccountRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    return await Promise.resolve({
      id: 'id',
      email: accountData.email,
      password: accountData.password,
    });
  }
}
