import env from './config/env';
import prisma from './config/prisma';

prisma
  .$connect()
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () => {
      console.log(`Server is running at http://localhost:${env.port}`);
    });
  })
  .catch(console.error);
