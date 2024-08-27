import { Context } from "koa";
import app from "src/app";

/* 这里可以集中处理错误 */
app.on("error", (err, ctx: Context) => {
	const code = err;
	let message = "";
	switch (err) {
		case -1000:
			message = "账号或者密码不能为空";
			break;
		case -1001:
			message = "该用户名已经被占用了";
			break;
		case -1002:
			message = "该用户名不存在";
			break;
		case -1003:
			message = "密码不正确，请检查密码";
			break;
		case -1004:
			message = "token不通过, 请重新登录";
			break;
		case -1005:
			message = "没有权限操作";
			break;
		case -1006:
			message = "不是该动态的作者，没有权限操作";
			break;
		case -1007:
			message = "删除失败";
			break;
		case -1008:
			message = "参数错误";
			break;
		case -1009:
			message = "同一篇文章不能有相同的标签";
			break;
		case -1010:
			message = "文章不存在";
			break;
		case -1011:
			message = "同一个用户不能出现重复的角色";
			break;
		case -1012:
			message = "角色不存在";
			break;
		case -1013:
			message = "角色必须填写";
			break;
		case -1014:
			message = "该用户已被禁用";
			break;
	}
	ctx.status = 404;
	ctx.body = {
		code,
		message,
		data: null,
	};
});
