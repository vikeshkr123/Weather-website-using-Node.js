
const request=require('request');
const forecast=function(latitude,longitude,callback){

    const url='https://api.darksky.net/forecast/39ec77409023af408469318ce3a198b9/'+ latitude +','+  longitude ;
     
    request({url,json:true},function(error,{body}){

        if(error){
            callback('Unable to connect to Network!',undefined);
        }else if(body.error){
            
            callback('Unable to find location!',undefined);
        }else{
            callback(undefined,
                body.daily.data[0].summary +' It is currently '+
                body.currently.temperature +' degrees out. There is a '+
                body.currently.precipProbability+'% chance of rain.'

            )
        }
    })
}

module.exports = forecast;