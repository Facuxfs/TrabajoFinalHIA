const reservaCtrl = require('./../controllers/reserva.controller');

const express = require('express');
const router = express.Router();

router.get('/', reservaCtrl.getReservas);
router.get('/usuario', reservaCtrl.getReservasUsuario);
router.get('/:id', reservaCtrl.getReserva);
router.post('/', reservaCtrl.createReserva);
router.delete('/:id', reservaCtrl.deleteReserva);
router.put('/:id', reservaCtrl.editReserva);

module.exports = router;