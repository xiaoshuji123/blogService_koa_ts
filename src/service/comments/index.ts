import { connect } from 'src/app/database';
import { Comment } from './type';

class CommentsService {
  async list(offset: number, limit: number, title: string) {
    // 数据库会将null当作特殊字符，所以当为null,把它转为空字符
    try {
      const [countResult] = await connect.execute(`SELECT COUNT(*) as total FROM comment`, [
        `%${title}%`,
      ]);
      const total = countResult[0].total as number;
      const statement = `
			SELECT
				C.id id , c.article_id articleId, c.content content, c.create_time createTime, c.parent_id parentId, u.name userName, a.title title,
				u2.name replyName
			FROM comment c
			LEFT JOIN user u ON u.id = c.user_id
			LEFT JOIN articles a ON a.id = c.article_id
			LEFT JOIN comment c2 ON c.parent_id = c2.id
			LEFT JOIN user u2 ON c2.user_id = u2.id
			WHERE a.title LIKE ?
			ORDER BY createTime DESC LIMIT ?, ?`;
      const [list] = await connect.execute(statement, [`%${title}%`, `${offset}`, `${limit}`]);
      return { total, list: list as Comment[] };
    } catch (error) {
      return error;
    }
  }
  async create(data) {
    let { articleId, content, userId, parentId = null, replyId } = data;
    if (!parentId) {
      parentId = null;
    }
    if (!replyId) {
      replyId = null;
    }
    try {
      const statement =
        'INSERT INTO `comment` (article_id, content, user_id, parent_id, reply_id) VALUES (?, ?, ?, ?, ?)';
      const [res] = await connect.execute(statement, [
        articleId,
        content,
        userId,
        parentId,
        replyId,
      ]);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number) {
    const statement = `DELETE FROM comment WHERE id = ?`;
    const [res] = await connect.execute(statement, [id]);
    return res;
  }
}

export default new CommentsService();
