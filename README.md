# locationjs
IP to location for nodejs

### Howto

Download GeoLite data

> wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCity_CSV/GeoLiteCity-latest.zip    
> unzip GeoLiteCity-latest.zip

Convert csv files to JSON

> node convert_blocks.js    
> node convert_location.js    

Import json files to mongodb

> mongoimport -d yourdb --collection geoblocks --file GeoLiteCity-Blocks.json    
> mongoimport -d yourdb --collection geolocation --file GeoLiteCity-Location.json

### Usage

> node test.js

