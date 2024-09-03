import KoaRouter from '@koa/router';
import { Context } from 'koa';
import { personalized_newsong, lyric } from 'NeteaseCloudMusicApi';

const musicRouter = new KoaRouter({ prefix: '/music' });

// 获取推荐新歌曲
musicRouter.get('/personalized', async (ctx: Context) => {
  try {
    const res = await personalized_newsong({});
    if (res.status === 200) {
      ctx.body = res.body;
    }
  } catch (error) {
    ctx.body = error;
  }
});

// 获取歌词
musicRouter.get('/lyric', async (ctx: Context) => {
  try {
    const { id } = ctx.query as { id: string | number };
    const res = await lyric({ id });
    if (res.status === 200) {
      ctx.body = res.body;
    }
  } catch (error) {
    ctx.body = error;
  }
});

export default musicRouter;
