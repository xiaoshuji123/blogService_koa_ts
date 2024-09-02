import { connect } from 'src/app/database';
import { CustomError } from 'src/utils/handle_error';
import { Article } from './type';

//平常get请求是?offset=0&limit=20这种常见的方式，它是字符串
//因为我采用的是post请求，传递过来的参数是数字类型，所以需要转换成字符串类型
// const [res] = await connect.execute(statement, [offset + '', limit + '']);
const list = async (offset: number, limit: number, title: string) => {
  try {
    const countStatement = `SELECT COUNT(*) as total FROM articles`;
    const [countResult] = await connect.execute(countStatement, [`%${title}%`]);
    const total = countResult[0].total as number;

    const statement = `
			SELECT
				a.id id , a.title title, a.content content, a.createTime createTime, a.updateTime updateTime, a.authorId authorId, u.name authorName, a.coverUrl coverUrl,
				CASE
					WHEN COUNT(at.tag_id) > 0
					THEN JSON_ARRAYAGG(JSON_OBJECT('label', t.id, 'value', t.name))
					ELSE JSON_ARRAY()
					END as tags,
				CASE
					WHEN COUNT(c.id) > 0 THEN JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'articleId', c.article_id, 'content', c.content, 'createTime', c.create_time, 'parentId', c.parent_id, 'userName', u.name ))
					ELSE JSON_ARRAY()
					END as comments
			FROM articles a
			LEFT JOIN user u ON u.id = a.authorId
			LEFT JOIN comment c ON c.article_id = a.id
			LEFT JOIN article_tags at ON at.article_id = a.id
			LEFT JOIN tags t ON at.tag_id = t.id
			WHERE a.title LIKE ?
			GROUP BY a.id
			ORDER BY createTime DESC LIMIT ?, ?`;
    const [res] = await connect.execute(statement, [`%${title}%`, `${offset}`, `${limit}`]);
    return {
      total,
      limit,
      offset,
      current_page: Number(offset) + 1,
      list: res as Article[],
    };
  } catch (error) {
    throw error;
  }
};
const createArticle = async (
  connection,
  title: string,
  content: string,
  coverUrl: string,
  authorId: number,
) => {
  const statement =
    'INSERT INTO articles (title, content, coverUrl, authorId) VALUES (?, ?, ?, ?);';
  const [res] = await connection.execute(statement, [title, content, coverUrl, authorId]);
  return res;
};
const editArticle = async (
  connection,
  title: string,
  content: string,
  authorId: number,
  coverUrl: string,
  id: number,
) => {
  try {
    const statement =
      'UPDATE articles SET title = ?, content = ?, authorId = ?, coverUrl = ? WHERE id = ?;';
    const [res] = await connection.execute(statement, [title, content, authorId, coverUrl, id]);
    return res;
  } catch (error) {
    throw error;
  }
};
const deleteArticle = async (id) => {
  const statement = `DELETE FROM articles WHERE id = ?`;
  const [res] = await connect.execute(statement, [id]);
  return res;
};

const articleDetail = async (articleId: number) => {
  try {
    const statement = `
			SELECT
				a.id id , a.title title, a.content content, a.createTime createTime, a.updateTime updateTime, a.authorId authorId, u.name authorName, a.coverUrl coverUrl,
				CASE
					WHEN COUNT(at.tag_id) > 0 THEN JSON_ARRAYAGG(at.tag_id)
					ELSE JSON_ARRAY()
					END as tagIds
			FROM articles a
			LEFT JOIN user u ON u.id = a.authorId
			LEFT JOIN article_tags at ON at.article_id = a.id
			WHERE a.id = ?
			GROUP BY a.id`;
    const [res] = await connect.execute(statement, [articleId]);
    return res[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createTagById = async (connection, articleId: number, tagId: number) => {
  try {
    await tagHandel(connection, tagId);
    const statement = `INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)`;
    const [res] = await connection.execute(statement, [articleId, tagId]);
    return res;
  } catch (error) {
    throw error;
  }
};
const editTagById = async (connection, articleId: number, newTagIds: number[]) => {
  try {
    // 1.检查文章是否存在，不存在返回错误信息
    // 2.检查新的标签是否存在。如果新的标签不存在，应该返回错误信息。
    // 3.检查新的标签是否和旧的标签相同。如果相同，不需要执行任何操作。
    // 4.删除旧的标签。
    // 5.添加新的标签。
    const [article] = await connection.execute(`SELECT * FROM articles WHERE id = ?`, [articleId]);
    if (!article[0]) {
      const error = new CustomError('文章不存在', 404);
      throw error;
    }
    for (const tagId of newTagIds) {
      await tagHandel(connection, tagId);
    }
    const [olds] = await connection.execute(
      `SELECT tag_id FROM article_tags WHERE article_id = ?`,
      [articleId],
    );
    const oldTagIds = olds.map((item) => item.tag_id);

    // 删除旧标签
    for (const oldTag of oldTagIds) {
      const index = newTagIds.findIndex((tagId) => tagId === oldTag);
      if (index === -1) {
        const statement = `DELETE FROM article_tags WHERE article_id = ? AND tag_id = ?`;
        await connection.execute(statement, [articleId, oldTag]);
      }
    }
    // 添加新标签
    for (const tagId of newTagIds) {
      const index = oldTagIds.findIndex((oldTag) => tagId === oldTag);
      if (index === -1) {
        const statement = `INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)`;
        await connection.execute(statement, [articleId, tagId]);
      }
    }
  } catch (error) {
    throw error;
  }
};

const getImg = async (filename: string): Promise<string> => {
  try {
    const statement = `SELECT * FROM image WHERE filename = ?`;
    const [res] = await connect.execute(statement, [filename]);
    return (res as any).pop();
  } catch (error) {
    throw error;
  }
};
const tagHandel = async (connection, tagId: number) => {
  // 1.检查新的标签是否存在。如果新的标签不存在，应该返回错误信息。
  try {
    const [tag] = await connection.execute(`SELECT * FROM tags WHERE id = ?`, [tagId]);
    if (!tag[0]) {
      const error = new CustomError('标签不存在', 404);
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const articlesService = {
  list,
  createArticle,
  editArticle,
  deleteArticle,
  articleDetail,
  createTagById,
  editTagById,
  getImg,
  tagHandel,
};

export default articlesService;
