function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Promesa resuelta!");
    }, 2000);
  });
}

async function asyncCallSuccessPromise() {
  console.log("Iniciando asyncCallSuccessPromise");
  const result = await resolveAfter2Seconds(); //await hace que js espere hasta que la promesa se cumpla y devuelva su resultado
  return result; //en result se guarda el dato que resuelve la promesa si esta se cumple. ---> result= 'Promesa resuelta!'
}

async function asyncCallSuccessNoPromise() {
  console.log("Iniciando asyncCallSuccessNoPromise");
  return "Franco"; // === return Promise.resolve("Franco")---> Esto es porque implicitamente una async function tambien devuelve
  //una promesa
}

async function asyncCallError() {
  console.log("Iniciando asyncCallError");
  throw new Error(":("); //warning por no manejar el error
}

async function asyncCallNoResponse() {
  console.log("Iniciando asyncCallNoResponse");
  const result = await resolveAfter2Seconds();
  //return undefinded
}

var p1 = asyncCallSuccessPromise();
console.log(p1); //Promise<pending> porque todavia no se ha indicado que hacer cuando se resuelve
p1.then((data) => console.log("p1: ", data)); //como es una instruccion asincrona se pasará al callback stack
var p2 = asyncCallSuccessNoPromise();
console.log(p2);
// var p3 = asyncCallError();
// console.log(p3);
// p3.catch((e) => console.log(e));
var p4 = asyncCallNoResponse();
p4.then((data) => console.log("p4: ", data));

// Ver p1, p2, p3 y p4 en la consola luego de pasado 2 segundos

// function* naturalNumbers() {
//   let number = 1;
//   while (true) {
//     yield number; // cada vez que se aplica un next a la generator function y se encuentra con un yield en el cuerpo de la funcion
//     //el valor que este asociado a ese yield sera devuelto en un objeto
//     number = number + 1;
//   }
// }

// var generatorObjectNatural = naturalNumbers();

// console.log(generatorObjectNatural.next()); //se devuelve {value:1, done:false}
// console.log(generatorObjectNatural.next());
// console.log(generatorObjectNatural.next());
// console.log(generatorObjectNatural.next());
