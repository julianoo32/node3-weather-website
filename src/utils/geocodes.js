const request = require('request');

const geoCode = (address, callBack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicXVhbmd0bWhlMTMwMDYwIiwiYSI6ImNrNnhlZXpyNTBoam8zZW84c3MxdTMxMHkifQ.ZYdp3CkJxKR8PvnnOr_ESg';
    request({ url, json: true}, (error, response) => {
       if(error) {
          callBack('Unable to connect to location service',undefined);
       } else if (response.body.features.length ===0){
          callBack('Unable to find location. Try another search.',undefined);
       } else{
          callBack(undefined, {
             latitude: response.body.features[0].center[1]  ,
             longtitude: response.body.features[0].center[0] , 
             location: response.body.features[0].place_name
          })
       } 
 
    })
 }


module.exports = geoCode;