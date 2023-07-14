// Defino controlador para el manejo de CRUD
const usuarioCtl = require('./../controllers/usuario.controller');
const authCtl= require('../controllers/auth.controller');
// Creamos el manejador de rutas
const express = require('express');
const route = express.Router();

route.get("/",authCtl.verifyToken,usuarioCtl.getUsuarios);
route.post("/",usuarioCtl.createUsuario);
route.post("/email",usuarioCtl.findEmail);
route.post("/dni",usuarioCtl.findDni);
route.post("/username",usuarioCtl.findUsername);
route.get("/:id",authCtl.verifyToken,usuarioCtl.getUsuario);
route.put("/:id",authCtl.verifyToken,usuarioCtl.edidUsuario);
route.delete("/:id",authCtl.verifyToken,usuarioCtl.deleteUsuario);
//route.post('/verificarUsuario', usuarioCtl.verificarUsuario);

module.exports=route;

// Exportamos el modulo de rutas
module.exports = route;