import { connect } from "src/app/database";

class TagService {
	async list(offset: number, limit: number, name: string) {
		try {
			const [countResult] = await connect.execute(
				`SELECT COUNT(*) as total FROM tags`,
				[`%${name}%`]
			);
			const total = countResult[0].total;
			const statement =
				"SELECT * FROM tags t WHERE t.name LIKE ? ORDER BY create_time DESC LIMIT ?, ?";
			const [list] = await connect.execute(statement, [
				`%${name}%`,
				`${offset}`,
				`${limit}`,
			]);
			return { total, list };
		} catch (error) {
			throw error;
		}
	}
	async create(name: string) {
		try {
			const statement = "INSERT INTO tags (name) VALUES (?)";
			const [res] = await connect.execute(statement, [name]);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async edit(id: number, name: string) {
		try {
			const statement = "UPDATE tags SET name = ? WHERE id = ?;";
			const [res] = await connect.execute(statement, [name, id]);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async delete(id: number) {
		try {
			const statement = "DELETE FROM tags WHERE id = ?;";
			const [res] = await connect.execute(statement, [id]);
			return res[0].affectedRows;
		} catch (error) {
			throw error;
		}
	}

	async detail(id: number) {
		try {
			const statement = "SELECT * FROM tags WHERE id = ?";
			const [res] = await connect.execute(statement, [id]);
			return res[0];
		} catch (error) {
			throw error;
		}
	}
}

export default new TagService();
