# locationjs
IP to location for nodejs. Gives you gps location, country, city from ip address. Useful to have an idea of where you visitors are without requiring weblocation services.

### Output

> lookupLocation("169.239.128.130")


```
{ _id: 57669f576faaeb5175afc1b4,
  locId: 377149,
  country: 'ZA',
  region: '11',
  city: 'Cape Town',
  postalCode: '7550',
  latitude: -33.8333,
  longitude: 18.65,
  metroCode: '',
  areaCode: '' }
```

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

