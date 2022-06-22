var primerMetodo = function() { //definimos una funcion que va a tener adentro a una instancia de Promise
    var promise = new Promise(function(resolve, reject){
       setTimeout(function() {
          console.log('Terminó el primer método');
          resolve({num: '123'}); //pasamos unos datos para ver como los manejamos
       }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
    });
    return promise;
 };

 var segundoMetodo = function(datos) { //como parametro de la funcion le va a llegar la data con la que se llama el resolve en la funcion
                                       //primerMetodo --->datos = {num: '123'}
    var promise = new Promise(function(resolve, reject){
       setTimeout(function() {
          console.log('Terminó el segundo método');
          resolve({nuevosDatos: datos.num + ' concatenamos texto y lo pasamos'});//definimos un nuevo objeto donde vamos a pasar 
                                                                                 //los datos que llegan por parametro
       }, 1000);
    });
    return promise;
 };
  
 /*
 primerMetodo()
 .then(data =>{
    console.log("1", data)
    segundoMetodo(data)
       .then(data2 => console.log("2", data2))
 })
 */

 // primerMetodo()
 // .then (data => {
 //    console.log(data)
 //    return segundoMetodo(data)
 // })
 // .then(data => console.log(data))
 // .catch(err => console.log(err))​
 var tercerMetodo = function(datos) { //datos= {nuevosDatos: datos.num + ' concatenamos texto y lo pasamos'}
    var promise = new Promise(function(resolve, reject){
       setTimeout(function() {
          console.log('Terminó el tercer método');
          console.log(datos.nuevosDatos); //imprimos los datos concatenados
          resolve('hola');
       }, 3000);
    });
    return promise;
 };
  
 primerMetodo() //Estamos aplicando el metodo then a primerMetodo() para poder decirle qué hacer cuando se resuelva o se rechaze
    .then(segundoMetodo) //si se cumple primerMetodo, entonces se ejecutara la funcion segundoMetodo
    .then(tercerMetodo) //si se cumple segundoMetodo entonces se resolvera tercerMetodo que es el que logguea el resultado final de la data
    .then(function(datos){  
       console.log(datos); //debería ser el 'hola' que se define en el reolve del tercerMetodo
    });