const { app } = require("electron");
const path = require("path");
const Datastore = require("nedb");
const fs = require("fs");

function saveDataToDB(data, partnb, dbPath) {
  return new Promise((resolve, reject) => {
    const db = new Datastore({ filename: dbPath, autoload: true });
    const promises = [];

    data.forEach((row) => {
      const document = {};

      for (let i = 2; i < row.length; i++) {
        document[i - 1] = row[i];
      }
      document.partnb = partnb;

      const promise = new Promise((resolve, reject) => {
        db.insert(document, (err, newDoc) => {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      });

      promises.push(promise);
    });

    Promise.all(promises)
      .then((results) => {
        console.log('Documentos insertados:', results);
        resolve();
      })
      .catch((error) => {
        console.error('Error al insertar en la base de datos:', error);
        reject(error);
      });
  });
}
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  module.exports = {
    saveDataToDB
};