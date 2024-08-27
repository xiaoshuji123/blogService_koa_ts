import dotenv  from 'dotenv';
dotenv.config(); // 加载 .env 文件中的环境变量

// 获取 .env 文件中的端口号, 服务地址
export const {
  SERVER_PORT,
  SERVER_HOST
} = process.env
