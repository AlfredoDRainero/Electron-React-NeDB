//const { app } = require("electron");
//const path = require("path");
const Datastore = require("nedb");
//const fs = require("fs");

function saveDataToDB(data, partnb, dbPath) {
  return new Promise((resolve, reject) => {
    const db = new Datastore({ filename: dbPath, autoload: true }); // Crea una instancia de la base de datos NeDB con la ruta proporcionada
    const promises = []; // Array para almacenar las promesas de inserción

    data.forEach((row) => {
      const document = {}; // Objeto para almacenar los datos de cada fila

      for (let i = 2; i < row.length; i++) {
        document[i - 1] = row[i]; // Asigna los valores de la fila al objeto document, comenzando desde la posición 2
      }
      document.partnb = partnb; // Agrega la propiedad partnb al objeto document con el valor de partnb proporcionado

      const promise = new Promise((resolve, reject) => {
        db.insert(document, (err, newDoc) => {
          if (err) {
            reject(err); // Si ocurre un error al insertar en la base de datos, rechaza la promesa con el error
          } else {
            resolve(newDoc); // Si la inserción es exitosa, resuelve la promesa con el nuevo documento insertado
          }
        });
      });

      promises.push(promise); // Agrega la promesa de inserción al array de promesas
    });

    Promise.all(promises)
      .then((results) => {
       // console.log('Documentos insertados:', results); // Imprime en la consola los documentos insertados correctamente
        resolve(); // Resuelve la promesa externa una vez que todas las promesas de inserción se han resuelto
      })
      .catch((error) => {
        console.error('Error al insertar en la base de datos:', error); // Imprime en la consola el error si alguna de las promesas de inserción es rechazada
        reject(error); // Rechaza la promesa externa con el error
      });
  });
}



  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  module.exports = {
    saveDataToDB
};


