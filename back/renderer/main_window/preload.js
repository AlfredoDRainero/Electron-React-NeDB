/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/preload.js":
/*!************************!*\
  !*** ./src/preload.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// See the Electron documentation for details on how to use preload scripts:\n// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts\n\n// Importa los módulos de Electron que necesites\nconst {\n  contextBridge,\n  ipcRenderer\n} = __webpack_require__(/*! electron */ \"electron\");\n\n// Exponer métodos o propiedades al contexto del navegador\ncontextBridge.exposeInMainWorld('electronAPI', {\n  // Ejemplo de método que se puede llamar desde el proceso de renderizado\n  enviarMensaje: mensaje => {\n    ipcRenderer.send('mensaje', mensaje);\n  },\n  enviarDatos: datos => {\n    ipcRenderer.send('datos-para-insertar', datos);\n  },\n  enviarDireccion: datos => {\n    ipcRenderer.send('direccion', datos);\n  },\n  recibirMensaje,\n  MSJ_DateTimePartnbPathFromFile_Main_to_App\n});\n\n// Función para recibir el mensaje desde main.js y exponerlo al contexto del navegador\nasync function recibirMensaje() {\n  return new Promise(resolve => {\n    ipcRenderer.once('mensaje-desde-main', (_, mensaje) => {\n      resolve(mensaje);\n    });\n    ipcRenderer.send('obtener-mensaje');\n  });\n}\n\n//\nasync function MSJ_DateTimePartnbPathFromFile_Main_to_App() {\n  return new Promise(resolve => {\n    ipcRenderer.once('dateTimePartnbPathFromFile_Main_to_App', (_, mensaje) => {\n      console.log(\"2 mensaje:\" + mensaje);\n      resolve(mensaje);\n    });\n    ipcRenderer.send('obtener-mensaje2');\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtFQUFFQSxhQUFhO0VBQUVDO0FBQVksQ0FBQyxHQUFHQyxtQkFBTyxDQUFDLDBCQUFVLENBQUM7O0FBRTFEO0FBQ0FGLGFBQWEsQ0FBQ0csaUJBQWlCLENBQUMsYUFBYSxFQUFFO0VBQzdDO0VBQ0FDLGFBQWEsRUFBR0MsT0FBTyxJQUFLO0lBQzFCSixXQUFXLENBQUNLLElBQUksQ0FBQyxTQUFTLEVBQUVELE9BQU8sQ0FBQztFQUN0QyxDQUFDO0VBSURFLFdBQVcsRUFBR0MsS0FBSyxJQUFLO0lBQ3RCUCxXQUFXLENBQUNLLElBQUksQ0FBQyxxQkFBcUIsRUFBRUUsS0FBSyxDQUFDO0VBQ2hELENBQUM7RUFFREMsZUFBZSxFQUFHRCxLQUFLLElBQUs7SUFDMUJQLFdBQVcsQ0FBQ0ssSUFBSSxDQUFDLFdBQVcsRUFBRUUsS0FBSyxDQUFDO0VBQ3RDLENBQUM7RUFHREUsY0FBYztFQUNkQztBQUNGLENBQUMsQ0FBQzs7QUFFRjtBQUNBLGVBQWVELGNBQWNBLENBQUEsRUFBRztFQUM5QixPQUFPLElBQUlFLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO0lBQzlCWixXQUFXLENBQUNhLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDQyxDQUFDLEVBQUVWLE9BQU8sS0FBSztNQUNyRFEsT0FBTyxDQUFDUixPQUFPLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0lBQ0ZKLFdBQVcsQ0FBQ0ssSUFBSSxDQUFDLGlCQUFpQixDQUFDO0VBQ3JDLENBQUMsQ0FBQztBQUNKOztBQUdBO0FBQ0EsZUFBZUssMENBQTBDQSxDQUFBLEVBQUc7RUFDMUQsT0FBTyxJQUFJQyxPQUFPLENBQUVDLE9BQU8sSUFBSztJQUM5QlosV0FBVyxDQUFDYSxJQUFJLENBQUMsd0NBQXdDLEVBQUUsQ0FBQ0MsQ0FBQyxFQUFFVixPQUFPLEtBQUs7TUFDekVXLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFlBQVksR0FBQ1osT0FBTyxDQUFDO01BQ2pDUSxPQUFPLENBQUNSLE9BQU8sQ0FBQztJQUNsQixDQUFDLENBQUM7SUFDRkosV0FBVyxDQUFDSyxJQUFJLENBQUMsa0JBQWtCLENBQUM7RUFFdEMsQ0FBQyxDQUFDO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1hcHAvLi9zcmMvcHJlbG9hZC5qcz82ZTQwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNlZSB0aGUgRWxlY3Ryb24gZG9jdW1lbnRhdGlvbiBmb3IgZGV0YWlscyBvbiBob3cgdG8gdXNlIHByZWxvYWQgc2NyaXB0czpcclxuLy8gaHR0cHM6Ly93d3cuZWxlY3Ryb25qcy5vcmcvZG9jcy9sYXRlc3QvdHV0b3JpYWwvcHJvY2Vzcy1tb2RlbCNwcmVsb2FkLXNjcmlwdHNcclxuXHJcbi8vIEltcG9ydGEgbG9zIG3Ds2R1bG9zIGRlIEVsZWN0cm9uIHF1ZSBuZWNlc2l0ZXNcclxuY29uc3QgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciB9ID0gcmVxdWlyZSgnZWxlY3Ryb24nKTtcclxuXHJcbi8vIEV4cG9uZXIgbcOpdG9kb3MgbyBwcm9waWVkYWRlcyBhbCBjb250ZXh0byBkZWwgbmF2ZWdhZG9yXHJcbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uQVBJJywge1xyXG4gIC8vIEVqZW1wbG8gZGUgbcOpdG9kbyBxdWUgc2UgcHVlZGUgbGxhbWFyIGRlc2RlIGVsIHByb2Nlc28gZGUgcmVuZGVyaXphZG9cclxuICBlbnZpYXJNZW5zYWplOiAobWVuc2FqZSkgPT4ge1xyXG4gICAgaXBjUmVuZGVyZXIuc2VuZCgnbWVuc2FqZScsIG1lbnNhamUpO1xyXG4gIH0sXHJcblxyXG5cclxuXHJcbiAgZW52aWFyRGF0b3M6IChkYXRvcykgPT4ge1xyXG4gICAgaXBjUmVuZGVyZXIuc2VuZCgnZGF0b3MtcGFyYS1pbnNlcnRhcicsIGRhdG9zKTtcclxuICB9LFxyXG5cclxuICBlbnZpYXJEaXJlY2Npb246IChkYXRvcykgPT4ge1xyXG4gICAgaXBjUmVuZGVyZXIuc2VuZCgnZGlyZWNjaW9uJywgZGF0b3MpO1xyXG4gIH0sXHJcblxyXG5cclxuICByZWNpYmlyTWVuc2FqZSxcclxuICBNU0pfRGF0ZVRpbWVQYXJ0bmJQYXRoRnJvbUZpbGVfTWFpbl90b19BcHBcclxufSk7XHJcblxyXG4vLyBGdW5jacOzbiBwYXJhIHJlY2liaXIgZWwgbWVuc2FqZSBkZXNkZSBtYWluLmpzIHkgZXhwb25lcmxvIGFsIGNvbnRleHRvIGRlbCBuYXZlZ2Fkb3JcclxuYXN5bmMgZnVuY3Rpb24gcmVjaWJpck1lbnNhamUoKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBpcGNSZW5kZXJlci5vbmNlKCdtZW5zYWplLWRlc2RlLW1haW4nLCAoXywgbWVuc2FqZSkgPT4ge1xyXG4gICAgICByZXNvbHZlKG1lbnNhamUpO1xyXG4gICAgfSk7XHJcbiAgICBpcGNSZW5kZXJlci5zZW5kKCdvYnRlbmVyLW1lbnNhamUnKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcbi8vXHJcbmFzeW5jIGZ1bmN0aW9uIE1TSl9EYXRlVGltZVBhcnRuYlBhdGhGcm9tRmlsZV9NYWluX3RvX0FwcCgpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGlwY1JlbmRlcmVyLm9uY2UoJ2RhdGVUaW1lUGFydG5iUGF0aEZyb21GaWxlX01haW5fdG9fQXBwJywgKF8sIG1lbnNhamUpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCIyIG1lbnNhamU6XCIrbWVuc2FqZSlcclxuICAgICAgcmVzb2x2ZShtZW5zYWplKTtcclxuICAgIH0pO1xyXG4gICAgaXBjUmVuZGVyZXIuc2VuZCgnb2J0ZW5lci1tZW5zYWplMicpO1xyXG4gICAgXHJcbiAgfSk7XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJjb250ZXh0QnJpZGdlIiwiaXBjUmVuZGVyZXIiLCJyZXF1aXJlIiwiZXhwb3NlSW5NYWluV29ybGQiLCJlbnZpYXJNZW5zYWplIiwibWVuc2FqZSIsInNlbmQiLCJlbnZpYXJEYXRvcyIsImRhdG9zIiwiZW52aWFyRGlyZWNjaW9uIiwicmVjaWJpck1lbnNhamUiLCJNU0pfRGF0ZVRpbWVQYXJ0bmJQYXRoRnJvbUZpbGVfTWFpbl90b19BcHAiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm9uY2UiLCJfIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/preload.js\n");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/preload.js");
/******/ 	
/******/ })()
;