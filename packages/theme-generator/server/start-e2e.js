/**
 * E2E 测试专用启动脚本
 * 使用 mongodb-memory-server 提供内存 MongoDB，无需外部数据库
 */
const { MongoMemoryServer } = require('mongodb-memory-server');

async function main() {
  // 启动内存 MongoDB
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  console.log('E2E MongoDB (in-memory):', uri);

  // 设置环境变量，让 db.js 使用内存 MongoDB
  process.env.MONGO_URI = uri;

  // 启动 Express 服务器
  const { connectDB } = require('./db');
  const app = require('./index');
  const PORT = process.env.PORT || 3200;

  await connectDB();
  app.listen(PORT, () => {
    console.log(`E2E API Server running on http://localhost:${PORT}`);
  });

  // 优雅关闭
  async function shutdown() {
    console.log('正在关闭 E2E 服务...');
    await require('mongoose').disconnect();
    await mongoServer.stop();
    process.exit(0);
  }
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

main().catch(err => {
  console.error('E2E 启动失败:', err.message);
  process.exit(1);
});
