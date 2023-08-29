const sqlite = require('better-sqlite3');

async function saveContenidoDataToDB(data, partnb, dbPath) {
  const db = new sqlite(dbPath);

  try {
    const columnNames = data[0].slice(2).map((columnName, index) => columnName);
    
    const createTableStmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS mediciones (
        id INTEGER PRIMARY KEY,
        partnb TEXT,
        ${columnNames.map(column => `${column} TEXT`).join(', ')}
      )
    `);
 
    createTableStmt.run();

    const insertStmt = db.prepare(`
      INSERT INTO mediciones (partnb, ${columnNames.join(', ')})
      VALUES (?, ${Array(columnNames.length).fill('?').join(', ')})
    `);

    db.transaction(() => {
      data.forEach((row, index) => {
        const documentExt = BucleRow(row, partnb);
        const insertValues = [partnb, ...documentExt.slice(1).map(value => value !== undefined ? value : null)];
        console.log("")

        if (index === 0) {
          
        }else if (insertValues.length === columnNames.length + 1) {
          insertStmt.run(insertValues);
        } else {
          //console.log("error en:",insertValues ,"no se agrego.. ver a futuro")
          //console.error("Error: Insufficient insert values provided _  insertValues.length:"+insertValues.length + " columnNames.length:"+ columnNames.length);
        }
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
