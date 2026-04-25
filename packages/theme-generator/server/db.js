const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rdesign-themes';

// 监听连接事件
mongoose.connection.on('error', (err) => {
  console.error('MongoDB 连接错误:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 连接已断开');
});

/**
 * 连接 MongoDB
 * @returns {Promise<void>}
 */
async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB 已连接:', MONGO_URI);
}

/**
 * 断开 MongoDB 连接
 * @returns {Promise<void>}
 */
async function disconnectDB() {
  await mongoose.disconnect();
}

/**
 * 获取当前连接状态
 * @returns {number} mongoose.connection.readyState
 */
function getConnectionState() {
  return mongoose.connection.readyState;
}

module.exports = { connectDB, disconnectDB, getConnectionState };
