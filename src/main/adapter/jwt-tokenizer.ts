import jwt from 'jsonwebtoken';

import { Tokenizer } from '@core/helpers/tokenizer';

type VerifyResponsePayload = {
  value?: string;
} & jwt.JwtPayload;

export class JWTTokenizerAdapter implements Tokenizer {
  constructor(
    private readonly secret: string,
    private readonly expirationTime: number
  ) {}

  sign(value: string): string {
    return jwt.sign({ value }, this.secret, {
      expiresIn: this.expirationTime,
    });
  }

  verify(token: string): string | undefined {
    const payload = jwt.verify(token, this.secret) as VerifyResponsePayload;
    return payload.value;
  }
}
