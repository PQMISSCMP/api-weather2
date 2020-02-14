const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const app = express();
const rutas = require("./routes");

const puerto = process.env.APP_PORT || 3000;

app.use(rutas);

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(bodyparser.json());


app.listen(puerto, () => {
    console.log(`Iniciando servidor en puerto ${puerto}`);
});
