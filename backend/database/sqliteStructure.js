const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB_FILE = './tasks.db';

// Define all table schemas in one place
const TABLE_SCHEMAS = {
  tasks: [
    { name: 'id', type: 'INTEGER', constraints: 'PRIMARY KEY AUTOINCREMENT' },
    { name: 'description', type: 'TEXT', constraints: 'NOT NULL' },
    { name: 'completed', type: 'INTEGER', constraints: 'DEFAULT 0' },
  ],
  // we can add more tables here. we should consider linking this to taskModels. to make sure the objects and their name is consistent. If with type restrictions. 
};


// Helper function to generate the CREATE TABLE SQL for a table
const generateCreateTableSQL = (tableName, schema) => {
  const columns = schema
    .map((col) => `${col.name} ${col.type} ${col.constraints || ''}`)
    .join(', ');
  return `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;
};

// Helper function to update table columns if schema changes
const updateTableColumns = (db, tableName, schema, callback) => {
  db.all(`PRAGMA table_info(${tableName})`, [], (err, existingColumns) => {
    if (err) {
      console.error(`Error fetching table info for ${tableName}:`, err.message);
      return callback(err);
    }

    const existingColumnNames = existingColumns.map((col) => col.name);
    const newColumns = schema.filter((col) => !existingColumnNames.includes(col.name));

    if (newColumns.length === 0) {
      console.log(`Table ${tableName} is up-to-date.`);
      return callback(null);
    }

    newColumns.forEach((col) => {
      const alterSQL = `ALTER TABLE ${tableName} ADD COLUMN ${col.name} ${col.type} ${col.constraints || ''}`;
      db.run(alterSQL, (alterErr) => {
        if (alterErr) {
          console.error(`Error adding column ${col.name} to table ${tableName}:`, alterErr.message);
        } else {
          console.log(`Column ${col.name} added to table ${tableName}`);
        }
      });
    });

    callback(null);
  });
};

// Initialize the database and handle table setup
const initializeDatabase = () => {
  const dbExists = fs.existsSync(DB_FILE); // // if we dont find a SQLite db. we create one. 

  const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err.message);
    } else {
      console.log('Connected to SQLite database');
    }
  });

  // Ensuring each table is created/updated
  for (const [tableName, schema] of Object.entries(TABLE_SCHEMAS)) {
    const createTableSQL = generateCreateTableSQL(tableName, schema);
    db.serialize(() => {
      // Create table if it doesn't exist
      db.run(createTableSQL, (err) => {
        if (err) {
          console.error(`Error creating table ${tableName}:`, err.message);
        } else if (!dbExists) {
          console.log(`Table ${tableName} created.`);
        } else {
          console.log(`Table ${tableName} checked.`);
        }

        // Update table columns if necessary
        updateTableColumns(db, tableName, schema, (updateErr) => {
          if (!updateErr) {
            //Missing columns in existing tables are added (via ALTER TABLE), and old data remains intact.
            console.log(`Table ${tableName} is up-to-date.`);
          }
        });
      });
    });
  }

  return db;
};

module.exports = initializeDatabase();