import KoaRouter from '@koa/router';
import articleController from 'src/controller/articles';

const ArticlesRouter = new KoaRouter({ prefix: "/article" });
ArticlesRouter.get('/list', articleController.list);

export default ArticlesRouter;