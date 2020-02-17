const express = require("express");
const app = express();

const { obtenerClima } = require("./controller");

app.get('/clima/:shortcountry', obtenerClima);

module.exports = app;
