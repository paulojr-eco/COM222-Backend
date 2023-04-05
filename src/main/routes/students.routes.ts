import { type Router } from 'express';

export default (router: Router): void => {
  router.post('/alunos', (req, res) => {
    res.json({ hello: 'world' });
  });
};
