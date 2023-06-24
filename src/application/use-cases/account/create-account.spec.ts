import { describe, expect, it, vi } from 'vitest';

import { CreateAccountData } from '@application/repositories/account';
import { InMemoryAccountRepository } from '@application/repositories/in-memory/in-memory-accounts';
import { DbCreateAccount } from './create-account';

const makeSut = () => {
  const inMemoryAccountRepository = new InMemoryAccountRepository();
  const sut = new DbCreateAccount(inMemoryAccountRepository);
  return {
    sut,
    accountRepository: inMemoryAccountRepository,
  };
};

const makeHttpAccountBody = (): CreateAccountData => {
  return {
    email: 'email@example',
    password: 'password',
  };
};

describe('Create account use case', () => {
  it('should call AccountRepository with correct values', async () => {
    const { sut, accountRepository } = makeSut();
    const createSpy = vi.spyOn(accountRepository, 'create');
    await sut.execute(makeHttpAccountBody());
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining(makeHttpAccountBody())
    );
  });

  it('should create a new account on success', async () => {
    const { accountRepository, sut } = makeSut();
    await sut.execute(makeHttpAccountBody());
    expect(accountRepository.accounts.length).toBe(1);
    expect(accountRepository.accounts[0].id).toBeTruthy();
    expect(accountRepository.accounts[0]).toEqual(
      expect.objectContaining({
        props: makeHttpAccountBody(),
      })
    );
  });
});
