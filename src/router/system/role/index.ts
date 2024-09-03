import KoaRouter from '@koa/router';
import RoleController from 'src/controller/system/role';
// 创建路由
const roleRouter = new KoaRouter({ prefix: "/role" });

roleRouter.get("/", RoleController.list);
roleRouter.get("/createRole", RoleController.create);
roleRouter.get("/editRole", RoleController.edit);
roleRouter.get("/deleteRole", RoleController.detail);

export default roleRouter;
