export const signUpParams = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John Doe',
    },
    email: {
      type: 'string',
      example: 'john@example.com',
    },
    password: {
      type: 'string',
      example: '123456',
    },
    passwordConfirmation: {
      type: 'string',
      example: '123456',
    },
  },
  required: ['name', 'email', 'password', 'passwordConfirmation'],
};
