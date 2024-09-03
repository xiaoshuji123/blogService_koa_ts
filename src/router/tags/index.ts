import KoaRouter from '@koa/router';
import tagsController from 'src/controller/tags';

const tagsRouter = new KoaRouter({ prefix: '/tags' });
// 1.标签列表
tagsRouter.post('/', tagsController.list);

// 2.创建标签
tagsRouter.post('/createTag', tagsController.create);

// 3.编辑标签
tagsRouter.post('/editTag/:tagId', tagsController.edit);

// 4.删除标签
tagsRouter.post('/deleteTag', tagsController.delete);

// 5.标签详情
tagsRouter.get('/:tagId', tagsController.detail);

export default tagsRouter;
