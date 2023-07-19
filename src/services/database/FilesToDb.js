const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const {
  splitText,
  convertLastFiveColumns,
  splitTextTitulo,
  obtenerSubcadenaHastaGuionBajo
} = require("../../utils/TextFormater");

const {
  obtenerFechaMedicion,
  obtenerYearFromDate,
  obtenerMonthFromDate
} = require("../../utils/fecha");

const {
  leerNumeroPartnb,
  actualizarNumeroPartnb
} = require("../database/partnb");

const { saveContenidoDataToDB  } = require("../database/SaveCHRtoDatabase");

const { saveTituloDataToDB } = require("../database/SaveHDRtoDatabase");



const { obtenerRegistrosEncontrados } = require("../database/loadDB");


//busca ultimo numero de indice partnb
let partNumber = 0;
leerNumeroPartnb((numero) => {
  partNumber = numero;
  console.log("Número leído:", partNumber);
});

//levanta archivos segun direccion enviada desde react a main y los formatea y graba en base de datos nedb

const userData = app.getAppPath(); // Obtén la ubicación de la aplicación

async function SaveFilesToDB(ubicacion) {

  const archivos = fs
    .readdirSync(ubicacion)
    .filter((file) => path.extname(file) === ".txt" && file.includes("_chr"));

  for (const archivo of archivos) {
    let archivoTitulo = archivo.replace("_chr", "_hdr");   

    // graba titulo + nombre de archivo
    let Titulo = fs.readFileSync(path.join(ubicacion, archivoTitulo), "utf8");
    const date = obtenerFechaMedicion(Titulo);
    const year = obtenerYearFromDate(date);
    const month = obtenerMonthFromDate(date);

    let dbPath = path.join(userData,"./data/" + obtenerSubcadenaHastaGuionBajo(archivoTitulo) + "_" + year + "_" +  month + ".db");
  
    if (!fs.existsSync(dbPath)) {
      //console.log("El archivo no existe. Creando nuevo archivo:", dbPath);
      fs.writeFileSync(dbPath, ""); // Crear archivo vacío
    }
    //await saveTituloDataToDB(splitTextTitulo(Titulo),Titulo, partNumber, dbPath);
    await saveTituloDataToDB(splitTextTitulo(Titulo,partNumber), dbPath);

    //---------------graba contenido
    let contenido = fs.readFileSync(path.join(ubicacion, archivo), "utf8");
    await saveContenidoDataToDB(      convertLastFiveColumns(splitText(contenido)), partNumber, dbPath
      
    );

    
    partNumber++;
  }

  
  actualizarNumeroPartnb(partNumber);


  obtenerRegistrosEncontrados()
  .then((registrosEncontrados) => {
    // Aquí podemos acceder a los datos en la variable registrosEncontrados
    console.log('Registros encontrados:', registrosEncontrados);
  })
  .catch((error) => {
    console.error('Error al obtener registros:', error);
  });

  
  
 
/*
  buscarArchivosEnCarpeta().then((resultados) => {
    console.log('Archivos encontrados:', resultados.archivosEncontrados);

 

  }).catch((error) => {
    console.error('Error:', error);
  });*/

  
  
  //const baseDeDatos = buscarArchivosEnCarpeta();
  //console.log("baseDeDatos:",baseDeDatos)

}

// ver si hace falta..
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*-------------------------- async y await -------------------
 Cuando se declara una función como async, automáticamente devuelve una promesa. 
 Esto significa que se puede utilizar await dentro de la función 
 para esperar a que se resuelva una promesa y obtener su resultado de forma sincrónica.
 
 Al utilizar la palabra clave await antes de una expresión de promesa, 
 la función se detiene en ese punto hasta que la promesa se resuelva o se rechace

Al llamar a una función async, se obtiene una promesa que representa la ejecución de la función. Esto permite utilizar métodos 
como .then() y .catch() para manejar la resolución o el rechazo de la promesa devuelta por la función async.
 */

/*// base de datos
db.loadDatabase((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Base de datos cargada correctamente");
  }
});
*/

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
