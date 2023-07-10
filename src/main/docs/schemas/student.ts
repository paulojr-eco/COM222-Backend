export const student = {
  type: 'object',
  properties: {
    _id: {
      description: 'Id do aluno',
      type: 'string',
      format: 'uuid',
    },
    props: {
      description: 'Propriedades do aluno',
      type: 'object',
      $ref: '#/schemas/createStudentParams',
    },
  },
  required: [],
};
