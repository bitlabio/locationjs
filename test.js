// This file imports the csv files from:
// http://geolite.maxmind.com/download/geoip/database/GeoLiteCity_CSV/GeoLiteCity-latest.zip
// Then saves the data into a mongodb 
// Once imported then don't run again.

// // mongoexport -d bitlab2 --collection geoblocks --out blgeoblocks.json
// mongoimport -d bitlab2 --collection geoblocks --file GeoLiteCity-Blocks.json
// mongoimport -d bitlab2 --collection geolocation --file GeoLiteCity-Location.json

var mongojs     = require('mongojs')
var db          = mongojs('bitlab2',["geoblocks","geolocation"]);


function lookupLocation(ip) {

	var ip_prep = ip;
	ip_prep = ip_prep.split('.');            
	var integer_ip = (16777216*ip_prep[0])+(65536*ip_prep[1])+(256*ip_prep[2])+(ip_prep[3]*1);
	console.log(integer_ip)

db.geoblocks.findOne({startIpNum:{$lte: integer_ip}, endIpNum:{$gte: integer_ip}}, function (err, res) {
	console.log(res)
	db.geolocation.findOne({locId:res.locId}, function (err, loc) { 
		console.log(loc)
	})
})
//db.geoblocks.find({endIpNum: {$lte: integer_ip}}).sort({endIpNum: -1}).limit(1);
//db.geoblocks.find({startIpNum: {$gt: integer_ip}}).sort({startIpNum: 1}).limit(1);

	//console.log(closestBelow)
	//console.log(closestAbove)
	
}

//lookupLocation("41.151.177.6")
lookupLocation("169.239.128.130")
