const dbUtils = require('./database/databaseUtils');

module.exports = (io) => {
  // Pass the Socket.IO instance to dbUtils
  dbUtils.init(io);
};