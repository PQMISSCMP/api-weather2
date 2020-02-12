const express = require("express");
const app = express();

const { obtenerclima }  = require("./controller");

app.get('/clima/:latitud/:longitud', obtenerclima);

module.exports = app;
