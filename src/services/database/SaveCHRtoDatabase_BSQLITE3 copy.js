const sqlite = require('better-sqlite3');

async function saveContenidoDataToDB(data, partnb, dbPath) {
  const db = new sqlite(dbPath);

  try {
    const columnNames = data[0].slice(2).map((_, index) => `column${index + 1}`);
    const createTableStmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS Mediciones (
        id INTEGER PRIMARY KEY,
        partnb TEXT,
        ${columnNames.map(column => `${column} TEXT`).join(', ')}
      )
    `);
    createTableStmt.run();

    const insertStmt = db.prepare(`
      INSERT INTO Mediciones (partnb, ${columnNames.join(', ')})
      VALUES (?, ${Array(columnNames.length).fill('?').join(', ')})
    `);

    db.transaction(() => {
      data.forEach((row) => {
        const documentExt = BucleRow(row, partnb);
        const insertValues = [partnb, ...documentExt.slice(1).map(value => value !== undefined ? value : null)];
        insertStmt.run(insertValues);
      });
    })();
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    throw error;
  } finally {
    db.close();
  }
}

function BucleRow(row, partnb) {
  const document = [partnb];

  const properties = row.slice(2);
  for (let index = 0; index < properties.length; index++) {
    document.push(properties[index]);
  }

  return document;
}

module.exports = {
  saveContenidoDataToDB
};
