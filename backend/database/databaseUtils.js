const db = require('./sqliteStructure'); // The initialized database
let io = null; // Placeholder for Socket.IO instance

// instead creating specific util for CURD on task. I created genric ones so that we can use them later.

// they are call with different function parameters, table, columns, values. 

module.exports = {
  init: (socketIo) => {
    io = socketIo;
  },

  // Fetch all rows from a specified table
  getAll: (tableName, callback) => {
    const query = `SELECT * FROM ${tableName}`;
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(`Error fetching from ${tableName}:`, err.message);
      }
      callback(err, rows);
    });
  },

  // Insert a new row into a specified table
  insert: (tableName, columns, values, callback) => {
    // if we have type restrictions we should definetly put these into objects like insertValues or even declare table specific insertion objects. we can probably put them under sqliteStructure. 
    const placeholders = values.map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    db.run(query, values, function (err) {
      if (err) {
        console.error(`Error inserting into ${tableName}:`, err.message);
        callback(err, null);
      } else {
        if (io) {
          io.emit('TASK_UPDATED'); // Notify all clients
        }
        callback(null, this.lastID); // Return the last inserted ID
      }
    });
  },

  // Update rows in a specified table
  update: (tableName, updates, condition, callback) => {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(', ');
    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${condition}`;
    db.run(query, Object.values(updates), function (err) {
      if (err) {
        console.error(`Error updating ${tableName}:`, err.message);
        callback(err, null);
      } else {
        if (io) {
          io.emit('TASK_UPDATED'); // Notify all clients
        }
        callback(null, this.changes); // Return number of updated rows
      }
    });
  },

  // Delete rows from a specified table
  deleteRow: (tableName, condition, callback) => {
    const query = `DELETE FROM ${tableName} WHERE ${condition}`;
    db.run(query, function (err) {
      if (err) {
        console.error(`Error deleting from ${tableName}:`, err.message);
        callback(err, null);
      } else {
        if (io) {
          io.emit('TASK_UPDATED'); // Notify all clients
        }
        callback(null, this.changes); // Return number of deleted rows
      }
    });
  },
};