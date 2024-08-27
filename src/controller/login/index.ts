import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { PRIVATE_KEY } from 'src/config/secret';

export const login = function (ctx: Context) {
  const { id, name } = ctx.user;
  // 颁发token PRIVATE_KEY的长度至少是2048
  const token = jwt.sign({ id, name }, PRIVATE_KEY, {
    expiresIn: 24 * 60 * 60 * 30, //过期时间(s)
    algorithm: 'RS256', //非对称加密
  });
  ctx.body = {
    code: 0,
    data: {
      id,
      name,
      token,
    },
    message: '登录成功',
  };
};
