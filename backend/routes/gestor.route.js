// Defino controlador para el manejo de CRUD
const gestorCtrl = require('./../controllers/gestor.controller');
const authCtl= require('../controllers/auth.controller');
// Creamos el manejador de rutas
const express = require('express');
const router = express.Router();

// Definimos las rutas para la gestion de producto
router.get('/',authCtl.verifyToken,gestorCtrl.getGestores);
router.get('/:id',authCtl.verifyToken,gestorCtrl.getGestor);
router.post('/', gestorCtrl.createGestor);
router.delete('/:id',authCtl.verifyToken, gestorCtrl.deleteGestor);
router.put('/:id',authCtl.verifyToken, gestorCtrl.editGestor);

// Exportamos el modulo de rutas
module.exports = router;