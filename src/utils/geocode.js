
const request=require('request');

const geocode=function(address,callback){
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoidmlrZXNoa3IxMjMiLCJhIjoiY2s0anMxNGZ1MGI0ajNrcDNyZG1ueno2ZSJ9.9JfSbALXjZ0GDfHtOa0S_w&limit=1';
    
    request({url,json:true},function(error,{body}){

        if(error){
            callback('Unable to connect to Network!',undefined);
        }else if(body.features.length === 0){
            callback('Unable to find Address!',undefined);
        }else{

            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports = geocode;