/*jshint esversion: 6 */

var fs = require('fs');

function readLines(input, callback) {
  var remaining = '';
  var lines = [];
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      lines.push(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    	callback(null, lines);
    }
  );
}

function get37(err, lines) {
  fs.openSync('out.csv', 'w');
  lines.forEach((line) => {
  	if (line.substring(0,2) == "37") {
	  fs.appendFile('./test/out.csv', line + '\n', (err) => {
	  	console.log(err);
	  }); 
	  console.log(line);
	}
  });
}

var input = fs.createReadStream('./test/eplusout.eso');
readLines(input, get37);


