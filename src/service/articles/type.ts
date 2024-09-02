export type Article = {
  id: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
  authorId: number;
  authorName: string;
  coverUrl: string;
  tags: string[];
  comments: string[];
};
