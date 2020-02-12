const express = require("express");
const app = express();
const rutas = require("./routes");

app.use(rutas);

app.listen(3000);