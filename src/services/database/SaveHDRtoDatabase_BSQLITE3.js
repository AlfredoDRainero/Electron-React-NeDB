// Import the 'better-sqlite3' module for interacting with SQLite databases
const sqlite = require('better-sqlite3');

// Define an asynchronous function to save 'tituloToDB' data to the database
async function saveTituloDataToDB(tituloToDB, dbPath) {
  // Create a connection to the SQLite database using the provided 'dbPath'
  const db = new sqlite(dbPath);

  try {
    // Extract the column names from 'tituloToDB', excluding the 'filename' key
    const columnNames = Object.keys(tituloToDB)
  //.map(key => (key === 'order' ? 'orden' : key))
  .filter(key => key !== 'filename')
  //.map(key => (key === 'order' ? 'orden' : key));
    // Create a comma-separated string of insert columns for the SQL statement
    const insertColumns = columnNames.join(', ');
    
    // Create an array of values to be inserted into the database
    const insertValues = columnNames.map(key => tituloToDB[key]);

    //console.log("*" , insertValues)

    // Prepare an SQL statement to create the 'title' table if it doesn't exist
    const createTableStmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS title (
        id INTEGER PRIMARY KEY,
        ${columnNames.map((aux, index) => `${aux} TEXT`).join(', ')}
      )
    `);

    // Execute the 'CREATE TABLE' statement
    createTableStmt.run();

    // Prepare an SQL statement to insert data into the 'title' table
    const insertStmt = db.prepare(`
      INSERT INTO title (${insertColumns}) VALUES (${Array.from({ length: columnNames.length }, () => '?').join(', ')})
    `);

    // Use a transaction to execute the insert statement with the values
    db.transaction(() => {
      insertStmt.run(...insertValues);
    })();
  } catch (error) {
    // If an error occurs, log the error and rethrow it
    console.error("Error al insertar en la base de datos:", error);
    throw error;
  } finally {
    // Ensure that the database connection is closed, whether there was an error or not
    db.close();
  }
}

// Export the 'saveTituloDataToDB' function for use in other modules
module.exports = {
  saveTituloDataToDB
};
