const fs = require("fs");
const path = require("path");
const { app } = require('electron');

// Función para buscar y devolver los nombres de todos los archivos en la carpeta './data'
function buscarArchivosEnCarpeta() {
  const userData = app.getAppPath();
  const carpetaData = path.join(userData, 'data');

  try {
    const archivos = fs.readdirSync(carpetaData);
    return archivos;
  } catch (error) {
    console.error("Error al leer la carpeta:", error);
    return [];
  }
}

function checkFolderExists(folderPath) {
  try {
    const stats = fs.statSync(folderPath);
    return stats.isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false; // El directorio no existe
    }
    throw error; // Manejar otros errores
  }
}

module.exports = {
  buscarArchivosEnCarpeta
};
