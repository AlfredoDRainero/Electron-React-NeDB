const fs = require('fs');
const path = require('path');

// Función para buscar y devolver los nombres de todos los archivos en la carpeta './data'
function buscarArchivosEnCarpeta() {
    return new Promise((resolve, reject) => {
      const directorio = './data';
      const archivosEncontrados = [];
  
      // Lee el contenido del directorio
      fs.readdir(directorio, (err, archivos) => {
        if (err) {
          console.error('Error al leer el directorio:', err);
          reject(err);
        } else {
          // Itera sobre los archivos encontrados
          archivos.forEach((archivo) => {
            // Verifica si es un archivo
            const rutaArchivo = path.join(directorio, archivo);
            fs.stat(rutaArchivo, (err, stats) => {
              if (err) {
                console.error('Error al obtener información del archivo:', err);
              } else {
                if (stats.isFile()) {
                  archivosEncontrados.push(directorio+"/"+archivo); // Agrega el nombre del archivo al array
                }
              }
  
              // Si todos los archivos se han verificado, resuelve la promesa con los resultados
              if (archivosEncontrados.length === archivos.length) {
                const resultados = {
                  archivosEncontrados,
                };
                resolve(resultados);
              }
            });
          });
        }
      });
    });
  }

  function checkFolderExists(folderPath) {
    try {
      const stats = fs.statSync(folderPath);
      return stats.isDirectory();
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false; // El directorio no existe
      }
      throw error; // Manejar otros errores
    }
  }
  

module.exports = {
    buscarArchivosEnCarpeta
  
  };