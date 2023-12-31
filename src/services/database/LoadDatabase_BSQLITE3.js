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


async function readFileInFolder(dbFolderPath, fileName) {
  const filePath = path.join(dbFolderPath, fileName);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw new Error('El archivo no existe o no es un archivo válido.');
  }

  const db = new Database(filePath, { verbose: console.log });
  const stmt = db.prepare('SELECT date, time, partcomment, partnb, orden FROM title');
  const rows = stmt.all();

  db.close();

  return { [fileName]: { data: rows } };
}

/*// Ejemplo de uso
const dbFolderPath = 'ruta/de/la/carpeta';
const fileName = 'nombre_del_archivo.db';

try {
  const result = await readFilesInFolder(dbFolderPath, fileName);
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
}*/


module.exports = {
  readFilesInFolder,
  readFileInFolder
};


function printObjectAsTable(obj) {
  for (const file in obj) {
    console.log(`Table for ${file}:`);
    console.log(obj[file].data);
    console.log(); // Agregar línea en blanco para separar las tablas
  }
}


