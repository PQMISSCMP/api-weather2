const express = require("express");
const app = express();
const rutas = require("./routes");
const puerto = process.env.APP_PORT;

app.use(rutas);

app.listen(puerto, () => {
    console.log(`Iniciando servidor en puerto ${puerto}`);
});
