const fs = require("fs");

function promisifiedReadFile(filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

//======================= Trabajando con Promises ===============//
// const readFilePromise = (archivo) => {
//   try {
//     // throw new Error("Error"); // --> si se ejecuta este error lo recibira el catch()
//     promisifiedReadFile(archivo)
//       .then((file) => {
//         console.log("Log promise file: ", file);
//         // throw new Error("Error"); //----> si se ejecuta este error lo recibira el .catch() de la promesa
//         return "Lectura exitosa";
//       })
//       .catch((err) => { //trabaja erorres de manera asincrona
//         console.log("Error asíncrono: ", err);
//         return "Error en lectura";
//       });
//   } catch (err) { //se usa mas para trabajar errores de manera sincrona
//     console.log("Error sincrono: ", err);
//   }
// };

//readFilePromise("archivo.txt");

//=========================== Trabajando con Async functions =============================//
const readFileAsync = async (archivo) => {
  try {
    // throw new Error("Error");
    console.log("Log async file: ", await promisifiedReadFile(archivo));
    return "Lectura exitosa";
  } catch (err) {
    //trabajamos errores asincronos de una menara asincrona por medio del catch()
    console.log("Error unificado: ", err);
  }
};

//readFileAsync("archivo.txt");
readFileAsync("archivos.txt"); // Para simular error asíncrono en async version

//---------------------------------------------------------------
// try{
//     //intenta ejecutar el codigo que se define aqui dentro
//     //Si el codigo no tiene ningun error, entonces no se ejecuta lo que este descrito en el catch
//     //por ejemplo
//                 //throw new Error('ERROR') -->este error lo podra manejar el catch()
// }catch(e){
//   //s el codiogo que se ejecuta en try arroja un error, entonces manejalo aca
// }
