const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const taskRoutes = require('./routes/resid.routes');
const { config } = require('dotenv'); // modulo para utilizar variables de entorno
config();

const app = express();

app.use(cors());
app.use(morgan('dev'));

// Agrega el middleware express.json() aquí antes de las rutas
app.use(express.json());

app.use(taskRoutes);

app.listen(4000);
console.log('Server on port 4000');