import KoaRouter from '@koa/router';
import commentsController from 'src/controller/comments';
const commentRouter = new KoaRouter({ prefix: '/comment' });

commentRouter.post('/list', commentsController.list);
commentRouter.post('/createComment', commentsController.create);
commentRouter.post('/deleteComment', commentsController.delete);

export default commentRouter;
