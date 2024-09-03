import { connect } from "src/app/database";

class RoleService {
	async list() {
		try {
			const statement = `SELECT * FROM role`;
			const [res] = await connect.execute(statement);
			return res;
		} catch (error) {
			throw error;
		}
	}
}

export default new RoleService();
