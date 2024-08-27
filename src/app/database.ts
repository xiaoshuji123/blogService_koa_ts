import mysql from 'mysql2';

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Coder123.',
  database: 'blogservice',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  maxIdle: 10, // 最大空闲连接数，默认等于 `connectionLimit`
  idleTimeout: 60000, // 空闲连接超时，以毫秒为单位，默认值为 60000 ms
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// 2.判断下链接池是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log('获取链接失败' + err);
    return;
  }
  // 2.获取connection,尝试和数据库建立一下链接
  connection.connect((err) => {
    if (err) {
      console.log('数据库交互失败', err);
    } else {
      console.log('数据库连接成功, 可以操作数据库~');
    }
  });
});

// 3.获取连接池中的连接对象（异步形式）
const connect = connectionPool.promise();

export { connect };
