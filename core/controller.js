const request = require("request-promise-native");

async function obtenerclima(request, response){

    const latitud = request.params.latitud;
    const longitud = request.params.longitud;
    const secretkey = request.headers['key-weather']; 
    
    try {
        const responseApiWeather = await getWeather(longitud, latitud, secretkey);
        response.status(200).send({latitud: latitud, longitud: longitud, weather: JSON.parse(responseApiWeather)});
    } catch (error) {
        response.status(500).send({latitud: latitud, longitud: longitud, error: error.message});
    }


}


async function getWeather(longitud, latitud, secretkey){
    try {
        const API_WEATHER = `https://api.darksky.net/forecast/${secretkey}/${latitud},${longitud}`;
        return resultApiWeather = await request.get(API_WEATHER);    
    } catch (error) {       
        throw error.message;
    }
}

module.exports  = { obtenerclima }
