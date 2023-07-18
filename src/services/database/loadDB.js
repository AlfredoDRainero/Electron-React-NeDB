const Datastore = require('nedb');

// Función para buscar y obtener los campos date, time y partnb de múltiples bases de datos
async function buscarFechaTiempoYPartnb(dbPaths) {
  const promesas = dbPaths.map((dbPath) => {
    return new Promise((resolve, reject) => {
      const db = new Datastore({ filename: dbPath, autoload: true });
      db.find({}, { date: 1, time: 1, partnb: 1, _id: 0 }, (err, registros) => {
        if (err) {
          console.error('Error al buscar en la base de datos:', err);
          resolve({
            dbPath,
            error: err,
          });
        } else {
          // Crea un objeto para almacenar los valores encontrados
          const valoresEncontrados = {
            dates: [],
            times: [],
            partnbs: [],
          };

          // Extrae los campos date, time y partnb de los registros encontrados
          for (const registro of registros) {
            valoresEncontrados.dates.push(registro.date);
            valoresEncontrados.times.push(registro.time);
            valoresEncontrados.partnbs.push(registro.partnb);
          }

          // Muestra los datos encontrados en la consola
          console.log('Fechas encontradas:', valoresEncontrados.dates);
          console.log('Tiempos encontrados:', valoresEncontrados.times);
          console.log('Partnbs encontrados:', valoresEncontrados.partnbs);

          resolve({
            dbPath,
            data: valoresEncontrados,
          });
        }
      });
    });
  });

  try {
    const resultados = await Promise.all(promesas);
    return resultados;
  } catch (error) {
    console.error('Error al buscar en las bases de datos:', error);
    return [];
  }
}

module.exports = {
    buscarFechaTiempoYPartnb

   
  
  };

  
// Llamada a la función para buscar y mostrar los datos
