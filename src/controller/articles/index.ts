import dayjs from 'dayjs';
import { Context } from 'koa';
import articlesService from 'src/service/articles';

const list = async (ctx: Context & { query: { offset: number; limit: number; title: string } }) => {
  try {
    const { offset = 0, limit = 20, title = '' } = ctx.query;
    const res = await articlesService.list(offset, limit, title);
    res.list.forEach((item) => {
      item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
      item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss');
    });
    if (res) {
      ctx.body = {
        code: 0,
        message: '',
        data: res,
      };
    }
  } catch (error) {
    throw error;
  }
};

const articleController = {
  list,
};

export default articleController;
