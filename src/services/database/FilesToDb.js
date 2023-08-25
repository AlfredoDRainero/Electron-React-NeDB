const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const Database = require("better-sqlite3");
/*
const {
  agregarNombreEnDB
} = require("./sqliteprueba");


*/
const {
  splitText,
  convertLastFiveColumns,
  splitTextTitulo,
  SubcadenaAGuionBajo
} = require("../../utils/TextFormater");

const {
  obtenerFechaMedicion,
  obtenerYearFromDate,
  obtenerMonthFromDate
} = require("../../utils/fecha");

const {
  readFilesInFolder
} = require("./LoadDatabase_BSQLITE3");


const {
  leerNumeroPartnb,
  actualizarNumeroPartnb
} = require("./PartnBToDB_NEDB");

const { saveContenidoDataToDB } = require("./SaveCHRtoDatabase_BSQLITE3");

const { saveTituloDataToDB } = require("./SaveHDRtoDatabase_BSQLITE3");


//busca ultimo numero de indice partnb
let partNumber = 0;
leerNumeroPartnb((numero) => {
  partNumber = numero;
  console.log("Número leído:", partNumber);
});

function checkForTildeFiles(ubicacion) {
  //console.log(fs.readdirSync());
  return fs.readdirSync(ubicacion).some((file) => file.includes("~"));
}

async function waitUntilFilesRemoved(ubicacion) {
  //console.log("////////////////// control //////////////////////")
  while (!checkForTildeFiles(ubicacion)) {
    console.log("///// control ///// - carpeta:", ubicacion);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Esperar 1 segundo
  }
}

//const dbpath = 'mi_basede_datos.db';
//const nombre = 'alfredo';

//levanta archivos segun direccion enviada desde react a main y los formatea y graba en base de datos nedb

const userData = app.getAppPath(); // Obtén la ubicación de la aplicación

async function SaveFilesToDB(ubicacion) {
  const archivos = fs
    .readdirSync(ubicacion)
    .filter((file) => path.extname(file) === ".txt" && file.includes("_chr"));

  for (const archivo of archivos) {
    //await waitUntilFilesRemoved("C:\\Users\\vwari8y.VW\\Documents\\informesCZ\\prueba4\\Electron-React-NeDB\\data\\");
    let archivoTitulo = archivo.replace("_chr", "_hdr");

    // graba titulo + nombre de archivo
    let Titulo = fs.readFileSync(path.join(ubicacion, archivoTitulo), "utf8");
    const date = obtenerFechaMedicion(Titulo);
    const year = obtenerYearFromDate(date);
    const month = obtenerMonthFromDate(date);

    console.log("archivo :", archivoTitulo);

    const dbPath = path.join(
      userData,
      `./data/${SubcadenaAGuionBajo(archivoTitulo)}_${year}_${month}.db`
    );
    console.log("dbpath:",readFilesInFolder)

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, ""); // Crear archivo vacío
    }

    //---------------graba contenido
    let contenido = fs.readFileSync(path.join(ubicacion, archivo), "utf8");
    let tituloToDB = splitTextTitulo(Titulo, partNumber);

    //funcionando
    try {
      await saveTituloDataToDB(  tituloToDB, dbPath);
       //console.log(" titulo",tituloToDB);
    } catch (error) {
      console.error("Error 91:", error);
    }

    try {
      await saveContenidoDataToDB(
        convertLastFiveColumns(splitText(contenido)),
        partNumber,
        dbPath
      );
      // console.log(". ",convertLastFiveColumns(splitText(contenido)));
    } catch (error) {}

    // Llamar a la función para agregar el nombre "alfredo" en la base de datos "mi_basede_datos.db"

    //agregarNombreEnDB(dbPath, "Alfredo");

    console.log("partNumber:", partNumber);

    //await delay(500); // delay pro el problema con neDB por la sincronia.. cambiar al cambiar base de datos

    partNumber++;
  }

  actualizarNumeroPartnb(partNumber);
  console.log("- termino -");


  //--- load ----
  const dbFolder = path.join(
    userData,`./data/`
  );
  //const dbFolder = "../../../../data/"; // Cambia esto a la ruta correcta
  const fileData = await readFilesInFolder(dbFolder);
 // console.log(fileData);


  
}



module.exports = {
  SaveFilesToDB
};


/*-------------------------- async y await -------------------
 Cuando se declara una función como async, automáticamente devuelve una promesa. 
 Esto significa que se puede utilizar await dentro de la función 
 para esperar a que se resuelva una promesa y obtener su resultado de forma sincrónica.
 
 Al utilizar la palabra clave await antes de una expresión de promesa, 
 la función se detiene en ese punto hasta que la promesa se resuelva o se rechace

Al llamar a una función async, se obtiene una promesa que representa la ejecución de la función. Esto permite utilizar métodos 
como .then() y .catch() para manejar la resolución o el rechazo de la promesa devuelta por la función async.
 */



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


