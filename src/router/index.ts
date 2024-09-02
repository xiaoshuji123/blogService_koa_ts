import Application from 'koa';
import loginRouter from './login';
import ArticlesRouter from './articles';
import commentRouter from './comments';

const registerRouters = (app: Application) => {
  app.use(loginRouter.routes()).use(loginRouter.allowedMethods());
  app.use(ArticlesRouter.routes()).use(ArticlesRouter.allowedMethods());
  app.use(commentRouter.routes()).use(commentRouter.allowedMethods());
};

export default registerRouters;
