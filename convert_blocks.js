// This file imports the csv files from:
// http://geolite.maxmind.com/download/geoip/database/GeoLiteCity_CSV/GeoLiteCity-latest.zip
// Then saves the data into a mongodb json
// Once imported then don't run again.

// mongoexport -d bitlab2 --collection geoblocks --out blgeoblocks.json
// mongoimport -d bitlab2 --collection geoblocks --file blgeoblocks.json

var fs = require('fs');

var file = fs.createWriteStream('GeoLiteCity-Blocks.json');
file.on('error', function(err) { /* error handling */ });

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('GeoLiteCity-Blocks.csv')
});

var linenum = 0
lineReader.on('line', function (line) {	
	//console.log('Line from file:', line);
	var entry = {}
	var line = line.split(',')
	if ((linenum >= 2)&&(line.length == 3)) {
	  entry.startIpNum = parseInt(line[0].replace(/\D/g,''))
	  entry.endIpNum = parseInt(line[1].replace(/\D/g,''))
	  entry.locId = parseInt(line[2].replace(/\D/g,''))
	  if (linenum % 10000 == 0) { console.log(linenum); }
	  file.write(JSON.stringify(entry) + '\n'); 
	}  
  linenum++;
});