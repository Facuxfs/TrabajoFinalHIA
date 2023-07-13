const reservaCtrl = require('./../controllers/reserva.controller');
const authCtl = require('../controllers/auth.controller')

const express = require('express');
const router = express.Router();

router.get('/',authCtl.verifyToken, reservaCtrl.getReservas);
router.get('/usuario', reservaCtrl.getReservasUsuario);
router.get('/:id',authCtl.verifyToken, reservaCtrl.getReserva);
router.post('/' , reservaCtrl.createReserva);
router.delete('/:id',authCtl.verifyToken, reservaCtrl.deleteReserva);
router.put('/:id',authCtl.verifyToken, reservaCtrl.editReserva);

module.exports = router;