const request = require("request-promise-native");
const asyncRedis = require("async-redis"); 

const clienteRedis = asyncRedis.createClient({host: process.env.SERVER_REDIS, port: 6379});

async function obtenerclima(req, res){

    const latitud = req.params.latitud;
    const longitud = req.params.longitud;
    const secretkey = req.headers['key-weather']; 
    
    try {
        const keyRedis = `KEY${latitud},${longitud}`;
        const { isKey, valueCache } = await isKeyRedis(keyRedis);

        if (isKey){
            console.log(`Consulto la cache:  ${keyRedis}`);
            res.status(200).send(JSON.parse(valueCache));
        }else{
            console.log(`Consulto la API`);
            const responseApiWeather = await getWeather(latitud, longitud, secretkey);
            setRedis(keyRedis, responseApiWeather)
            res.status(200).send(JSON.parse(responseApiWeather));
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getWeather(latitud,longitud , secretkey){
    try {
        const API_WEATHER = `${process.env.API_WEATHER}/${secretkey}/${latitud},${longitud}`;
        return resultApiWeather = await request.get(API_WEATHER);    
    } catch (error) {       
        throw error;
    }
}


async function isKeyRedis(keyRedis){
    const value = await clienteRedis.get(keyRedis);
    return { isKey: value !== null, valueCache: value };
}

async function setRedis(keyRedis, jsonWeather){
    await clienteRedis.set(keyRedis, jsonWeather);
}


module.exports  = { obtenerclima }
