import 'module-alias/register'; // 支持路径别名
// import moduleAlias from 'module-alias'; // 支持路径别名
// moduleAlias.addAlias('src', __dirname); // 编程的方式注册别名

import app from './app';
import { SERVER_PORT } from './config';
import { generateKey } from './config/key';
import registerRouters from './router';

generateKey();
registerRouters(app);

app.listen(SERVER_PORT, () => {
  console.log('koa服务器已经开启了');
});
