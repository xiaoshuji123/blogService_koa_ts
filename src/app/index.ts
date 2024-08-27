import Koa from 'koa';
import { bodyParser } from '@koa/bodyparser';
import cors  from '@koa/cors';
// 1.创建服务器
const app = new Koa();

// 防止跨域
app.use(cors())

// 使用第三方中间件解析body数据
app.use(bodyParser())

export default app;