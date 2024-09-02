import dayjs from 'dayjs';
import { Context } from 'koa';
import commentsService from 'src/service/comments';

class CommentsController {
  async list(ctx: Context) {
    const { offset = 0, limit = 20, title = '' } = ctx.request.body;
    const res = await commentsService.list(offset, limit, title);
    res.list.forEach((item) => {
      item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
    });
    if (res) {
      ctx.body = {
        code: 0,
        message: '',
        data: res,
      };
    }
  }
  async create(ctx: Context) {
    try {
      const data = ctx.request.body;
      const res = await commentsService.create(data);
      if (res) {
        ctx.body = {
          code: 0,
          message: '创建成功',
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async delete(ctx: Context) {
    const { id } = ctx.request.body;
    const res = await commentsService.delete(id);
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除成功',
        data: null,
      };
    }
  }
}

export default new CommentsController();
