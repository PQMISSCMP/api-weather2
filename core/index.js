const express = require("express");
const app = express();
const rutas = require("./routes");

const puerto = (process.env.PORT || 8000);
app.use(rutas);

app.listen(puerto, () => {
    console.log(`9-Iniciando servidor en puerto interno ${puerto}`);
});
