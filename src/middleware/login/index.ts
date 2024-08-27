import type { Context, Next } from 'koa';
import { findUserByName } from 'src/service/login';
import sha256Password from 'src/utils/sha_password';

export const vertifyLogin = async function (ctx: Context, next: Next) {
  const { name, password } = ctx.request.body;
  // 1.判断一下有无账号，密码
  if (!name || !password) {
    ctx.app.emit('error', -1000, ctx);
    return;
  }
  // 2.判断一下账号是否在数据库存在
  const user = await findUserByName(name);
  if (!user) {
    ctx.app.emit('error', -1001, ctx);
    return;
  }
  // 3.密码是否正确
  if (user.password !== sha256Password(password)) {
    ctx.app.emit('error', -1003, ctx);
    return;
  }
  //  4.判断下是否被禁用 0|1 禁用|启用
  if (user.status === 0) {
    ctx.app.emit('error', -1014, ctx);
    return;
  }
  // 保存user，后续使用
  ctx.user = user;
  await next();
};
