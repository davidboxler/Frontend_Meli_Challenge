const express = require("express");
const cors = require("cors");
const itemsRoutes = require('./routes/itemsRoutes');
const pruebaRoutes = require('./routes/pruebaRoutes');

const app = express();
const puerto = 3900;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(itemsRoutes);
app.use(pruebaRoutes);

app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto);
});