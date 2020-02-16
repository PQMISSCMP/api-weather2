const express = require("express");
const app = express();
const rutas = require("./routes");
const { runSwagger } = require("../swagger");

app.use(rutas);
runSwagger(app);

const puerto = (process.env.PORT || 8000);
app.listen(puerto, () => {
    console.log(`Iniciando servidor en puerto interno ${puerto}`);
});
