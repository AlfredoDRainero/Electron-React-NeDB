const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

async function readFilesInFolder(dbFolderPath) {
  const files = fs.readdirSync(dbFolderPath);
  const result = [];

  for (const file of files) {
    const filePath = path.join(dbFolderPath, file);
    if (fs.statSync(filePath).isFile()) {
      const db = new Database(filePath, { verbose: console.log });
      const stmt = db.prepare('SELECT date, time, partcomment, orden FROM title');
      const rows = stmt.all();

      result.push({
        //fileName: file,
        data: rows
      });
      
      console.log("* row loaded:",rows)

      db.close();
    }
  }

  return result;
}


module.exports = {
  readFilesInFolder
};



