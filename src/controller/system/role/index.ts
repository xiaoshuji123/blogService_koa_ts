import { Context } from "koa";
import RoleService from 'src/service/system/role';

class RoleController {
	async list(ctx: Context) {
		try {
			const res = await RoleService.list();
			if (res) {
				ctx.body = {
					code: 0,
					data: res,
					message: null,
				};
			}
		} catch (error) {
			ctx.status = 404;
			ctx.body = {
				code: -1,
				data: null,
				message: error.message,
			};
		}
	}
	create() {}
	edit() {}
	detail() {}
}

export default new RoleController();
