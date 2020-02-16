const request = require("request-promise-native");
const asyncRedis = require("async-redis");

const clienteRedis = asyncRedis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

const obtenerClima = async(req, res) => {

    const latitud = req.params.latitud;
    const longitud = req.params.longitud;
    const secretkey = process.env.API_KEY; 
    
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    try {
        const keyRedis = `KEY${latitud},${longitud}`;
        const { isKey, valueCache } = await isKeyRedis(keyRedis);

        if (isKey){
            console.log(`consulto la cache:  ${keyRedis}`);
            res.status(200).send(JSON.parse(valueCache));
        }else{
            console.log(`consulto la API`);
            const responseApiWeather = await getWeather(latitud, longitud, secretkey);
            setRedis(keyRedis, responseApiWeather);            
            res.status(200).send(JSON.parse(responseApiWeather));
        }
    } catch (error) {       
        res.status(500).send({error: JSON.parse(error)});
    }
}

const getWeather = async(latitud,longitud , secretkey) => {
    try {
        const API_WEATHER = `${process.env.API_URL}/${secretkey}/${latitud},${longitud}`;
        const resultApiWeather = await request.get(API_WEATHER);
        if (typeof resultApiWeather === "undefined") { throw new Error("Verifique los parametros de entrada") }
        return resultApiWeather;
    } catch (issue) {
        console.log(issue.error);
        throw (issue.error);
    }
}


const isKeyRedis  = async(keyRedis) => {
    const value = await clienteRedis.get(keyRedis);
    return { isKey: value !== null, valueCache: value }
}

const setRedis = async(keyRedis, jsonWeather) => {
    await clienteRedis.set(keyRedis, jsonWeather);
}

module.exports  = { obtenerclima: obtenerClima }
