const request = require('request');

const forecast = (latitude, longtitude, callBack) => {
    let url = 'https://api.darksky.net/forecast/91da267b4989d396bf12b5f6ad8b351b/'+latitude+','+longtitude+'?units=si';
    console.log(url)
    request({url, json: true}, (error, {body})=>{
       if(error){
          callBack('Unable to connect to server',undefined);
       }else if (body.error){
          callBack('Unable to find forecast with given location',undefined);
       }else{
          const {precipProbability ,temperature }  = body.currently;
          const dailySummary = body.daily.data[0].summary;
          const result = dailySummary+" It is currently "+temperature+" degrees out. There is a "+precipProbability+"% of rain"; 
          callBack(undefined, result)
       }
 
    })
 }
 module.exports = forecast;

