export const signInParams = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'john@example.com',
    },
    password: {
      type: 'string',
      example: '123456',
    },
  },
  required: ['email', 'password'],
};
