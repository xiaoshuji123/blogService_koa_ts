import Router from '@koa/router';
import { login } from 'src/controller/login';
import { vertifyLogin } from 'src/middleware/login';
const loginRouter = new Router();
loginRouter.post('/login', vertifyLogin, login);

export default loginRouter;
