// Defino controlador para el manejo de CRUD
const adminCtrl = require('./../controllers/admin.controller');
const authCtrl = require('../controllers/auth.controller');
// Creamos el manejador de rutas
const express = require('express');
const router = express.Router();

// Definimos las rutas para la gestion de producto
router.get('/', authCtrl.verifyToken, adminCtrl.getAdmins);
//router.get('/:id', authCtrl.verifyToken, adminCtrl.getAdmin);
router.get('/:id', adminCtrl.getAdmin);
router.post('/', adminCtrl.createAdmin);
router.delete('/:id', authCtrl.verifyToken, adminCtrl.deleteAdmin);
router.put('/:id', authCtrl.verifyToken, adminCtrl.editAdmin);

// Exportamos el modulo de rutas
module.exports = router;