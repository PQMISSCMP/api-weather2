const request = require("request-promise-native");
const asyncRedis = require("async-redis");

const clienteRedis = asyncRedis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

/**
 * 
 * @param {*} latitud 
 * @param {*} longitud 
 * @param {*} secretkey 
 * Consulta el tiempo en un determinado lugar del globo
 */
const getWeather = async(latitud,longitud , secretkey) => {
    try {
        const API_WEATHER = `${process.env.API_URL}/${secretkey}/${latitud},${longitud}`;
        const resultApiWeather = await request.get(API_WEATHER);
        if (typeof resultApiWeather === "undefined") { throw new Error("Verifique los parametros de entrada") }
        return { temperatura: resultApiWeather.currently.temperature, fechahora: resultApiWeather.currently.time };
    } catch (issue) {
        console.log(issue.error);
        throw (issue.error);
    }
}

/**
 * 
 * @param {*} keyRedis 
 * Verifica si se puede utilizar data de cache
 */
const isKeyRedis  = async(keyRedis) => {
    const value = await clienteRedis.get(keyRedis);
    return { isKey: value !== null, valueCache: value }
}

/**
 * 
 * @param {*} keyRedis 
 * @param {*} jsonWeather 
 * Guarda datos en cache
 */
const setRedis = async(keyRedis, jsonWeather) => {
    await clienteRedis.set(keyRedis, jsonWeather);
}


/**
 * 
 * @param {*} shortNameCountry 
 * Obtiene toda la información relativa a un determinado pais, incluido el nombre y su capital dado un nombre corto. Ej: Chile -> CL
 */
const getInfoCountry = async(shortNameCountry) =>{

    const queryApi = `${process.env.REACT_APP_URL_API_COUNTRIES}/${shortNameCountry}`;
    let jsonCountry;
    try {
        const response = await request.get( queryApi );
        if (typeof response === "undefined"){ throw new Error('Error al obtener data del país.') }
        jsonCountry = JSON.parse(response);
        return {pais: jsonCountry.name, capital: jsonCountry.capital, latitud: jsonCountry.latlng[0], longitud: jsonCountry.latlng[1]};
    } catch (error) {
        throw error;
    }    
}


module.exports = { getWeather, isKeyRedis, setRedis, getInfoCountry }
