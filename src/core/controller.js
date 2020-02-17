
const { getWeather, isKeyRedis, setRedis, getInfoCountry } = require("./repository");


const obtenerClima = async(req, res) => {

    const shortCountry = req.params.shortcountry;
    const secretkey = process.env.KEY_API_WEATHER; 
    
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    try {
        const keyRedis = `KEY-${shortCountry}-`;
        const { isKey, valueCache } = await isKeyRedis(keyRedis);
        if (isKey){
            console.log(`consulto la cache:  ${keyRedis}`);
            const dataParsed = JSON.parse(valueCache);
            dataParsed.cache=true;
            res.status(200).send(dataParsed);
        }else{

            console.log(`consulto las APIs`);
            const { pais, capital, latitud, longitud } = await getInfoCountry(shortCountry);
            const { fechahora, temperatura } = await getWeather(latitud, longitud, secretkey);

            const dataRedis = {
                apiWeather: { fechahora, temperatura },
                infoCountry: { capital, pais },
                cache: false
            };

            setRedis(keyRedis, JSON.stringify(dataRedis));            
            res.status(200).send(dataRedis);

        }
    } catch (issue) {       
        if (issue.hasOwnProperty("mesagge")) { 
            console.log("obtenerClima: ", issue.mesagge); 
            res.status(500).send({error: issue.mesagge});
        } else if (issue.hasOwnProperty("error")) { 
            console.log("obtenerClima: ", issue.error); 
            res.status(500).send({error: issue.error});
        }
        else {
            res.status(500).send({error: 'Error inesperado'});
        }
        
    }
}


module.exports  = { obtenerClima }
