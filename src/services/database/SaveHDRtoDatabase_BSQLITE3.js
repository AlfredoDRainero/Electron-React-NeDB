const sqlite = require('better-sqlite3');

async function saveTituloDataToDB(tituloToDB, dbPath) {
  const db = new sqlite(dbPath);

  try {
    const columnNames = Object.keys(tituloToDB).filter(key => key !== 'filename');
    const insertColumns = columnNames.join(', ');
    const insertValues = columnNames.map(key => tituloToDB[key]);

    const createTableStmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS title (
        id INTEGER PRIMARY KEY,
        ${columnNames.map((_, index) => `column${index + 1} TEXT`).join(', ')}
      )
    `);

    createTableStmt.run();

    const insertStmt = db.prepare(`
      INSERT INTO title (${insertColumns}) VALUES (${Array.from({ length: columnNames.length }, () => '?').join(', ')})
    `);

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
