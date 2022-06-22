var fs = require('fs');
// const pA = new Promise(function(resolve, reject){
//     //Codigo asincronico
//     setTimeout(() => {
//    // resolve('Se resuelve A')
//     reject('Error en A')
//     }, 1000);
// })

// console.log('1',pA)

//¿Como hacemos que loq ue tiene el resolve se ejecute?
//Aplicando el metodo .then que sera el encargado de decir que cuando se resuelva lo asincronico de la promesa ejecute lo que este
//en el resolve

// pA.then(data =>{
//     console.log('2: ', data)
// })
// .catch(err => console.log('3: ',err))

//===========================================
const pA = new Promise(function (resolve, reject) {
  //Codigo asincronico
  setTimeout(() => {
    resolve("Se resuelve A");
    //reject('Error en A')
  }, 1000);
});

//When promiseA is fulfilled with value and has no succes handler promiseB resolve(value)
//promesa A -----> tiene que resolver 'Se resuelve A' ----> pero no se indica en el .then que sera lo que se devuelva cuando se
//cumpla la promesa (has no success handle)--------> entonces promesa B va y  resuelve 'Se resuelve A'

// const pB = pA.then()
// pB.then(data =>{
//     console.log(data)
// })
// .catch(err => console.log(err) //when promiseA is rejected reason and has no error handler promiseB reject(reason)

//==========================================
// promiseReadFile('archivo1.txt')
// .then(stanza => {
//     blue(stanza);
//     return promiseReadFile('archivo2.txt'); //se retorna una nueva promesa, entonces esta promesa se pasara como parametro al then
// })//terminado este then se va a tener una promesa que seria la que se esta retornando, por lo tanto podemos aplicar un .then
// .then(stanza2 =>{
//     blue(stanza2)
// })







pA.then()
  .then()
  .then((data) => {
    console.log('1: ', data); //'Resuelve A'
    // return "Enrique"; //si ponemos este return 'Enrique' sera lo que se envie al parametro de la siguiente promesa
    return data;
  })
  .then((data) => {
    console.log('2: ', data); //undefined porque como esta encadenado con la promesa de arriba siempre se espera que implicita o explicitamente
    //haya un valor retornado que será el que se pase al parametro de la siguinete promesa y como en la anterior promesa
    //no hay nada que se retorne entonces el parametro data de esta segunda recibe ese undefined y es lo que se loogue
})
.then(data =>{
    console.log('3:', data); //undefined
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            //resolve('Resuelve a B')
            reject('Error en B')
        }, 1000);
    })
}) //se retorna una nueva promesa 
.then(data => {
    console.log('4: ', data); //Resuelve a B
}, err => {
    console.log('5: ', err)
    // throw new Error('Otro Error')  //como se esta retornando este error el catch lo recibe y lo logguea, si no estuviera
                                      //ya no se ejecuta el catch porque el handlefailure de el ultimo then ya capturo un error
})
// .catch(err =>
//     console.log('6: ', err))
  
console.log('FIN')





//Se define una nueva instancia de Promise
var promise = new Promise(function(resolve, reject) {
  // Hacer cosas acá dentro, probablemente asincrónicas.
  fs.readFile('./archivo1.txt5', 'utf8', function(err, data) { //el metodo readFile lee de manera asincronica todo el contenido del archivo 
                                                              //de la ruta que se le pasa por parametro 
    if (err) {
      return reject(Error("Algo se rompió")); //retornamos el parametro reject con un objeto Error
    }
    //console.log(data);    
    resolve(data); //se llama al parametro resolve con la data que se lee fs.readFile
  }); 
});


promise 
  .then(null, err=>err) //en la primer promesa solo definimos el handleError
  .then(data => data, err => console.log('Soy el error: ', err)) //entonces esta segunda promesa va a tomar en su succesH lo que se retorno
                                                                //en la anterior que es lo que rechaza la en la definicion de la promesa
                                                          //lo que se rechazo del la promesa pasa del errorHandler del priumer .then()
                                                          //al succesHandler del segundo .then().
  .then(data => console.log('Soy la ultima data: ', data)) //a esta promise le llega ese retorno de lo que se rechazo e imprime 
                                                          //Soy la ultima data: Error: Algo se rompió
//En resumen cuando se tiene un handleError en la primer promesa esta lo va a pasar a la siguiente como un handleSucces                                                           