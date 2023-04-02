import { describe, expect, test, vi } from 'vitest';
import { AccountModel } from '../../../domain/models/account';
import { AddAccountModel } from '../../../domain/use-cases/add-account';
import { AddAccountRepository } from '../../protocols/add-account-repository';
import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await Promise.resolve('hashedPassword');
    }
  }
  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'id',
        email: 'email@example.com',
        password: 'hashedPassword',
      };
      return await Promise.resolve(fakeAccount);
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe('DbAddAccount', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = vi.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      email: 'email@example.com',
      password: 'password',
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('password');
  });

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    vi.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      Promise.reject(new Error(''))
    );
    const accountData = {
      email: 'email@example.com',
      password: 'password',
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = vi.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      email: 'email@example.com',
      password: 'password',
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      email: 'email@example.com',
      password: 'hashedPassword',
    });
  });

  test('should throw AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    vi.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      Promise.reject(new Error(''))
    );
    const accountData = {
      email: 'email@example.com',
      password: 'password',
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();
    const accountData = {
      email: 'email@example.com',
      password: 'password',
    };
    const account = await sut.add(accountData);
    expect(account).toEqual({
      id: 'id',
      email: 'email@example.com',
      password: 'hashedPassword',
    });
  });
});
