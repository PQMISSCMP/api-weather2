const express = require("express");
const app = express();

const { obtenerclima }  = require("./controller");

app.get('/clima/:shortcountry', obtenerclima);

module.exports = app;
