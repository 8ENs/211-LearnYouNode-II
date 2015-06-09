var http = require('http');
var url = [process.argv[2], process.argv[3], process.argv[4]];
var queue = 0;
var result = [];
var bl = require('bl');

function printResults() {
	for (var i = 0; i < 3; i++) {
		console.log(result[i]);
	}
}

function httpGet(i) {
	http.get(url[i], function(response) {
		response.pipe(bl(function (err, data) {
     if (err)
       return console.error(err)

			// response.on('data', function(data) { 
				result[i] = data.toString();
			// });
			// response.on('end', function() {
				queue++;
			// });
			if (queue == 3) {
				printResults();
			}
		}));
	});
}

for (var i = 0; i < 3; i++) {
	httpGet(i);
}

/*
var http = require('http')
var bl   = require('bl')
var map  = require('map-async')

function printResults (err, results) {
  if (err)
    throw err
  results.forEach(function (result) {
    console.log(result)
  })
}

function httpGet (url, callback) {
  http.get(url, function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return callback(err)
      callback(err, data.toString())
    }))
  })
}

map(process.argv.slice(2), httpGet, printResults)
*/