//defino controlador para el manejo de CRUD
const reseniaCtrl = require('./../controllers/resenia.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.post('/',reseniaCtrl.createResenia);//Dar de alta (POST), enviar además el esp.
router.get('/:id', reseniaCtrl.getResenia);//recupera resemias

router.get('/', reseniaCtrl.getResenias);//Recuperar TODOS los  (GET) incluyendo la información del usuario y serv
router.delete('/:id', reseniaCtrl.deleteResenia);//Eliminar un  
router.put('/:id', reseniaCtrl.modificarResenia);//Modificar un 

router.get('/:id', reseniaCtrl.getResenia);//recupera solo por id

router.get('/usuario/:usuarioId', reseniaCtrl.getReseniasUsuario);
router.get('/servicio/:servicioId', reseniaCtrl.getReseniasServicio);
module.exports = router;