var fs = require('fs');

//Se define una nueva instancia de Promise
var promise = new Promise(function(resolve, reject) {
  // Hacer cosas acá dentro, probablemente asincrónicas.
  fs.readFile('./archivo.txt', 'utf8', function(err, data) { //el metodo readFile lee de manera asincronica todo el contenido del archivo 
                                                              //de la ruta que se le pasa por parametro 
    if (err) {
      return reject(Error("Algo se rompió")); //retornamos el parametro reject con un objeto Error
    }
    //console.log(data);    
    resolve(data); //se llama al parametro resolve con la data que lee fs.readFile
  }); 
});

//console.log(promise) //Promise {<pending>} porque entre el resolve hay codigo asincronico que esta esperando a resolverse
// {status: pending}

// promise.then(function(data) { //Usamos el metodo .then para devolver lo que pasaria si se cumple o rechaza la promes definida anteriormente 
//                               //el parametro del cb de .then es el mismo con el que se llama a resolve
// //promise: {status: fulfilled, value: data}                          
//     console.log(data)         //Si se cumple la promise se ejecuta la funcion succes handler, la cual logguea la data que se resuelve en la 
                                  //definicion de la promesa
    
// }, function(err){             //el parametro err va a contener el return reject(Error("Algo se rompió"))
// //promise: {status: rejected, reason: Error}
//   console.log("se rechazo", err)  //en caso contrario se resuelve la funcion errorhandler que es el segundo parametro del then, la cual
                                    //loggea 'se rechazo' mas el error devuelto por el reject

// })

// promise.then(function(){
//     console.log("segunda promesa")
// })

// console.log("termine")



//-----Encadenando promesas -----------------
promise
.then(data => data) //En esta primera promise se manda al argumento data el archivo que se lee y luego se retorna
// email? --> id: 5
.then(segundaData =>  segundaData) //luego en esta segunda promise la data que se retorno anteriormente se le pasa a el nuevo argumento
                                  //segundaData y se vuelve a retornar
// id: 5 ---> administrador
.then(terceraData =>{           //para cuando se llega a la tercera promise en el nuevo argumento terceraData se recibe lo retornado de la
                                //anterior promise y finalmente se muestra en consola
    // administrador --> rutas de acceso?
    console.log("3", terceraData)
    throw new Error ("se rompio en la tercer promesa")
})
.catch(err => console.log(err)) //si algo sale mal al parametro err del .catch se le manda lo que se retorna en el reject que esta
                                //en la definicion de la promise y lo loggea