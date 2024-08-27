import app from './app';
import { SERVER_PORT } from './config';
import { generateKey } from './config/key';
import registerRouters from './router';

generateKey();
registerRouters(app);

app.listen(SERVER_PORT, () => {
  console.log('koa服务器已经开启了');
});
