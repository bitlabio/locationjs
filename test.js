// See https://github.com/bitlabio/locationjs/

var mongojs     = require('mongojs')
var db          = mongojs('yourdb',["geoblocks","geolocation"]);


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
	
}

//lookupLocation("41.151.177.6")
lookupLocation("169.239.128.130")
