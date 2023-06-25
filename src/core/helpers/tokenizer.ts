export interface Tokenizer {
  sign: (value: string) => string;
  verify: (token: string) => string | undefined;
}
