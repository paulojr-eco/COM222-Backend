export const session = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
    },
  },
  required: ['accessToken'],
};
