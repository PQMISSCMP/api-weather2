const express = require("express");
const app = express();
const rutas = require("./routes");

const puerto = process.env.APP_PORT || 8000;
app.use(rutas);

app.listen(puerto, () => {
    console.log(`7-Iniciando servidor en puerto ${puerto}`);
});
