const { app } = require("electron");
const path = require("path");
//const Datastore = require("nedb");
const fs = require("fs");


const {
  splitText,
  convertLastFiveColumns,
  splitTextTitulo,
  obtenerSubcadenaHastaGuionBajo
} = require("../../utils/TextFormater2");

const {
  leerNumeroPartnb,
  actualizarNumeroPartnb
} = require("../database/partnb");

const {
  saveDataToDB  
} = require("../database/database");


//busca ultimo numero de indice partnb
let partNumber = 0;
leerNumeroPartnb((numero) => {
  partNumber = numero;
  console.log("Número leído:", partNumber);
});

//levanta archivos segun direccion enviada desde react a main y los formatea y graba en base de datos nedb

const userData = app.getAppPath(); // Obtén la ubicación de la aplicación




async function SaveFilesToDB(ubicacion) {
  // Delay para asegurar la carga del programa
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("dir:" + ubicacion);

  const archivos = fs.readdirSync(ubicacion).filter((file) => path.extname(file) === ".txt" && file.includes("_chr"));

  for (const archivo of archivos) {
    let archivoTitulo = archivo.replace("_chr", "_hdr");
    console.log("archivoTitulo:" + obtenerSubcadenaHastaGuionBajo(archivoTitulo));

    let dbPath = path.join(userData, "./data/" + obtenerSubcadenaHastaGuionBajo(archivoTitulo) + ".db");
    console.log("dbPath:", dbPath);

    if (!fs.existsSync(dbPath)) {
      console.log("El archivo no existe. Creando nuevo archivo:", dbPath);
      fs.writeFileSync(dbPath, ""); // Crear archivo vacío
    }

    let Titulo = fs.readFileSync(path.join(ubicacion, archivoTitulo), "utf8");
    await saveDataToDB(splitTextTitulo(Titulo), partNumber, dbPath);

    let contenido = fs.readFileSync(path.join(ubicacion, archivo), "utf8");
    await saveDataToDB(convertLastFiveColumns(splitText(contenido)), partNumber, dbPath);

    partNumber++;
  }

  actualizarNumeroPartnb(partNumber);
}


// ver si hace falta..
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



//base de datos
/*function saveDataToDB(data, partnb) {
  data.forEach((row) => {
    const document = {};
    for (let i = 2; i < row.length; i++) {
      document[i - 1] = row[i];
    }

    document.partnb = partnb;

    db.insert(document, (err, newDoc) => {
      if (err) {
        console.error("Error al insertar en la base de datos:", err);
      } else {
        console.log("Documento insertado:", newDoc);
      }
    });
  });
}*/

/*// base de datos
db.loadDatabase((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Base de datos cargada correctamente");
  }
});
*/
/*function insertData(data) {
  db.insert(data, (err, newDoc) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Datos insertados:", newDoc);
    }
  });
}*/

/*ipcMain.on("datos-para-insertar", (event, data) => {
  insertData(data);
});*/

//imprecion de objeto
/*const imprimirArrayObjetos = (arrayObjetos) => {
  arrayObjetos.forEach((objeto, index) => {
    console.log(`Objeto ${index + 1}:`);
    Object.entries(objeto).forEach(([clave, valor]) => {
      console.log(`  ${clave}: ${valor}`);
    });
    console.log("-----------------------");
  });
};*/

module.exports = {
  SaveFilesToDB
};

//global.insertData = insertData;
