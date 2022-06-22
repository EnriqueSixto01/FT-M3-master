function* generatorShowInstructors() {
  console.log("Iniciando generator function");
  yield "Franco"; // 2 Pausa
  yield "Toni"; // 4 Pausa
  console.log("Generator function terminada");
}

var generatorObject = generatorShowInstructors();
console.log(generatorObject); //Object[Generator]{}
console.log(generatorObject.next()); // 1 se ejecuta la funcion ---> devuelve un objeto {value, done}
//{value: 'Franco', done:false} ---> el done nos indica si la generqator function ya se termino o no
console.log(generatorObject.next()); // 3 se ejecuta la funcion
//{value: 'Toni', done:false}
console.log(generatorObject.next()); // como ya se termino de ejecutar la funcion este .next() ya no tendria caso
//{value: undefined, done:true}

function* generatorShowInstructorsWithParameter() {
  console.log("Iniciando generator function with parameter");
  console.log(1, yield);
  console.log(2, yield);
}

var generatorObjectParameter = generatorShowInstructorsWithParameter();

generatorObjectParameter.next();
generatorObjectParameter.next("Franco");
generatorObjectParameter.next("Toni");
