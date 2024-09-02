export type Comment = {
  id: number;
  title: string;
  content: string;
  createTime: string;
  articleId: string;
  authorId: number;
  parentId: number;
  userName: string;
  replyName: string;
};
