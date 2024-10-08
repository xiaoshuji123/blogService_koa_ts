import Application from 'koa';
import loginRouter from './login';
import ArticlesRouter from './articles';
import commentRouter from './comments';
import roleRouter from './system/role';
import tagsRouter from './tags';
import musicRouter from './music';

const registerRouters = (app: Application) => {
  app.use(loginRouter.routes()).use(loginRouter.allowedMethods());
  app.use(ArticlesRouter.routes()).use(ArticlesRouter.allowedMethods());
  app.use(commentRouter.routes()).use(commentRouter.allowedMethods());
  app.use(tagsRouter.routes()).use(tagsRouter.allowedMethods());
  app.use(roleRouter.routes()).use(roleRouter.allowedMethods());
  app.use(musicRouter.routes()).use(musicRouter.allowedMethods());
  
};

export default registerRouters;
