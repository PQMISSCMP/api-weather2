const { getWeather, isKeyRedis, setRedis, getInfoCountry } = require("./repository");


const obtenerClima = async(req, res) => {

    const shortCountry = req.params.shortcountry;
    const secretkey = process.env.API_KEY; 
    
    res.header("Access-Control-Allow-Origin", req.headers.origin);

    try {
        const keyRedis = `KEY-${shortCountry}`;
        const { isKey, valueCache } = await isKeyRedis(keyRedis);
        if (isKey){
            console.log(`consulto la cache:  ${keyRedis}`);
            res.status(200).send(JSON.parse(valueCache));
        } else {

            console.log(`consulto las APIs`);
            const { pais, capital, latitud, longitud } = await getInfoCountry(shortCountry);
            const { temperatura, fechahora } = await getWeather(latitud, longitud, secretkey);
            
            const dataRedis = {
                apiWeather: { temperatura, fechahora },
                infoCountry: { pais, capital}
            };

            setRedis(keyRedis, dataRedis);            
            res.status(200).send(JSON.parse(responseApiWeather));

        }
    } catch (error) {
        res.status(500).send({error: JSON.parse(error)});
    }
}


module.exports  = { obtenerClima }
