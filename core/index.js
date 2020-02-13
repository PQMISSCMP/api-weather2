const express = require("express");
const app = express();
const rutas = require("./routes");

const puerto = 3000;
app.use(rutas);

app.listen(puerto, () => {
    console.log(`Iniciando servidor en puerto ${puerto}`);
    
});