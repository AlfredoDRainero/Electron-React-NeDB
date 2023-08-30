const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

async function readFilesInFolder(dbFolderPath) {
  const files = fs.readdirSync(dbFolderPath);
  const result = {}; // Cambiado [] (arreglo) por {} (objeto)

  for (const file of files) {
    const filePath = path.join(dbFolderPath, file);
    if (fs.statSync(filePath).isFile()) {
      const db = new Database(filePath, { verbose: console.log });
      const stmt = db.prepare('SELECT date, time, partcomment, partnb, orden FROM title');
      const rows = stmt.all();
      
      // Agregar datos al objeto result
      result[file] = { data: rows };
      
      db.close();
    }
  }
 

  //imprime objeto en consola.
  //printObjectAsTable(result);

  return result;
}

module.exports = {
  readFilesInFolder
};


function printObjectAsTable(obj) {
  for (const file in obj) {
    console.log(`Table for ${file}:`);
    console.log(obj[file].data);
    console.log(); // Agregar línea en blanco para separar las tablas
  }
}


