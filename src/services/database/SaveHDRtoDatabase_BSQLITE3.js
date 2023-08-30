const sqlite = require("better-sqlite3");

// Define an asynchronous function to save 'tituloToDB' data to the database
async function saveTituloDataToDB(tituloToDB, dbPath) {
  const db = new sqlite(dbPath);

  try {
    // Extract the column names from 'tituloToDB', excluding the 'filename' key
    const columnNames = Object.keys(tituloToDB).filter(
      (key) => key !== "filename"
    );

    // Create a comma-separated string of insert columns for the SQL statement
    const insertColumns = columnNames.join(", ");

    // Create an array of values to be inserted into the database
    const insertValues = columnNames.map((key) => tituloToDB[key]);

    // Prepare an SQL statement to create the 'title' table if it doesn't exist
    /*const createTableStmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS title (
        id INTEGER PRIMARY KEY,
        ${columnNames.map((aux, index) => `${aux} TEXT`).join(", ")}
      )
    `);*/

    const createTableStmt = db.prepare(`
  CREATE TABLE IF NOT EXISTS title (
    id INTEGER PRIMARY KEY,
    ${columnNames
      .map((aux, index) => {
        if (aux === "partnb") {
          
          return `${aux} INTEGER`; // Si es "partnb", se crea como INTEGER
        } else {
          return `${aux} TEXT`; // De lo contrario, se crea como TEXT
        }
      })
      .join(", ")}
  )
`);

    // Execute the 'CREATE TABLE' statement
    createTableStmt.run();

    const insertStmt = db.prepare(`
      INSERT INTO title (${insertColumns}) VALUES (${Array.from(
      { length: columnNames.length },
      () => "?"
    ).join(", ")})
    `);

    // Use a transaction to execute the insert statement with the values
    db.transaction(() => {
      insertStmt.run(...insertValues);
    })();
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    throw error;
  } finally {
    db.close();
  }
}

module.exports = {
  saveTituloDataToDB
};
