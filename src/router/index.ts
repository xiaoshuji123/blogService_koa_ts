import Application from 'koa';
import loginRouter from './login';

const registerRouters = (app: Application) => {
  app.use(loginRouter.routes()).use(loginRouter.allowedMethods());
};

export default registerRouters;
