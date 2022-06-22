var fs = require('fs');


function readFile (filename, callback) {
	var randExtraTime = Math.random() * 200;
	setTimeout(function () {
		fs.readFile(filename, function (err, buffer) {
			if (err) callback(err);
			else callback(null, buffer.toString());
		});
	}, randExtraTime);
};

function promisifiedReadFile (filename) {
	return new Promise(function (resolve, reject) {
		readFile(filename, function (err, str) {
			if (err) reject(err);
			else resolve(str);
		});
	});
};

// promisifiedReadFile('archivo1.txt')
// .then(data => console.log(data))
// promisifiedReadFile('archivo2.txt')
// .then(data => console.log(data))

// var one = promisifiedReadFile('archivo1.txt')
// var two = promisifiedReadFile('archivo2.txt')

// Promise.all([one, two])
// .then(data => console.log(data.toString()))

var all = ['archivo1.txt', 'archivo2.txt']
var files = all.map(el => promisifiedReadFile(el))
Promise.all(files)
console.log(files) //[ Promise { <pending> }, Promise { <pending> } ]
.then(data => console.log(data.toString()))
.catch(err => console.log(err))
.finally(console.log("terminamos la clase"))