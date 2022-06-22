 const {date, pwd} = require('./commands');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  if(cmd === 'date') {
    process.stdout.write(date());  
  }
  if(cmd === 'pwd') {
    process.stdout.write(pwd())
    // process.stdout.write(process.cwd())
  }
  process.stdout.write('\nprompt > ');
});

// console.log(process.mainModule.path)