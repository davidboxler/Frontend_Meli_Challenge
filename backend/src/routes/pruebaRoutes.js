const express = require("express");
const router = express.Router();
const pruebaController = require('../controllers/pruebaController');

router.get("/ruta-prueba", pruebaController.rutaPrueba);

module.exports = router;