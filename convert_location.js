// This file imports the csv files from:
// http://geolite.maxmind.com/download/geoip/database/GeoLiteCity_CSV/GeoLiteCity-latest.zip
// Then saves the data into a mongodb json file
// Once imported then don't run again.

// mongoexport -d bitlab2 --collection geoblocks --out blgeoblocks.json
// mongoimport -d handshake --collection geoblocks --file GeoLiteCity-Blocks.json
// mongoimport -d handshake --collection geolocation --file GeoLiteCity-Location.json

var fs = require('fs');
var file = fs.createWriteStream('GeoLiteCity-Location.json');
file.on('error', function(err) { /* error handling */ });

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('GeoLiteCity-Location.csv')
});

var linenum = 0
lineReader.on('line', function (line) {
	//console.log('Line from file:', line);
	var entry = {}
	var line = line.split(',')
	if ((linenum >= 2)&&(line.length == 9)) {
	  //entry.startIpNum = parseInt(line[0].replace(/\D/g,''))
	  //entry.endIpNum = parseInt(line[1].replace(/\D/g,''))
	  //entry.locId = parseInt(line[2].replace(/\D/g,''))
		entry.locId 			= parseInt(line[0].replace(/\D/g,''))
		entry.country 		= line[1].replace('"', '').replace('"', '')
		entry.region 			= line[2].replace('"', '').replace('"', '')
		entry.city 				= line[3].replace('"', '').replace('"', '')
		entry.postalCode 	= line[4].replace('"', '').replace('"', '')
		entry.latitude 		= parseFloat(line[5])
		entry.longitude 	= parseFloat(line[6])
		entry.metroCode 	= line[7].replace('"', '').replace('"', '')
		entry.areaCode 		= line[8].replace('"', '').replace('"', '')

	  if (linenum % 10000 == 0) { console.log(linenum); }
	  file.write(JSON.stringify(entry) + '\n'); 
	  
	}  
  linenum++;
});