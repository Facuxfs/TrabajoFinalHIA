const Reserva = require('../models/reserva');
const Usuario = require('../models/usuario');
const Servicio = require('../models/servicio');
const reservaCtrl = {};

/**
  * recupera las todas las reservas (GET)
  * @param {*} req 
  * @param {*} res 
  */
reservaCtrl.getReservas = async (req, res) => {
    let criteria = {}
    //filtro por estado de reserva y usuario
    if ((req.query.usuario != null && req.query.usuario != "") && (req.query.reservado != null && req.query.reservado != "")) {
        criteria.usuario=req.query.usuario;
        criteria.reservado=req.query.reservado;
    }
    //filtro por categoria de servicio y usuario
    if ((req.query.usuario != null && req.query.usuario != "") && (req.query.categoria != null && req.query.categoria != "")) {
        criteria.usuario=req.query.usuario;
        criteria.categoria=req.query.categoria;
    }

    //filtro por nombre de servicio y usuario
    if ((req.query.usuario != null && req.query.usuario != "") && (req.query.nombreServicio != null && req.query.nombreServicio != "")) {
        criteria.usuario=req.query.usuario;
        criteria.nombreServicio=req.query.nombreServicio;
    }

    //filtro por usuario
    if (req.query.usuario != null && req.query.usuario != "") {
        criteria.usuario=req.query.usuario;     
    }

    //filtro por estado de reserva y servicio
    if ((req.query.servicio != null && req.query.servicio != "") && (req.query.reservado != null && req.query.reservado != "")) {
        criteria.servicio=req.query.servicio;
        criteria.reservado=req.query.reservado;
    }

     //filtro por servicio
     if (req.query.servicio != null && req.query.servicio != "") {
        criteria.servicio=req.query.servicio;
    }

     //filtro por Estado de Reserva
     if (req.query.reservado != null && req.query.reservado != "") {
        criteria.reservado=req.query.reservado;
    }

    //filtro por categoria
     if (req.query.categoria != null && req.query.categoria != "") {
        criteria.categoria=req.query.categoria;
    }

    var reservas = await Reserva.find(criteria);
    res.json(reservas);
};


reservaCtrl.getReservasUsuario = async (req, res) => {
    try {
        let criteria = {};
        if ((req.query.usuario != null) && (req.query.usuario != "")) {
            criteria.usuario = req.query.usuario;
        }

        if ( ((req.query.usuario!= null) && (req.query.usuario!= ""))  && 
             ((req.query.reservado!=null) && (req.query.reservado!="")) ) {
            criteria.usuario=req.query.usuario;
            criteria.reservado=req.query.reservado;
        }

        var reservas = await Reserva.find(criteria);
        res.json(reservas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las reservas.', error });
    }
  };


/**
 * ALta de una reserva (POST)
 * @param {*} req 
 * @param {*} res 
 */
reservaCtrl.createReserva = async (req, res) => {
    try {
        const reserva = new Reserva(req.body);
        const usuario = await Usuario.findById(req.body.usuario);
        const servicio = await Servicio.findById(req.body.servicio);
        await reserva.save();
        usuario.reservas.push(reserva._id);
        await Usuario.updateOne({ _id: req.body.usuario }, usuario);
        servicio.reservas.push(reserva._id);
        await Servicio.updateOne({_id: req.body.servicio},servicio);
        res.status(200).json({
            "status": "1",
            "msg": "reserva guardada"
        })
    } catch (error) {
        res.status(400).json({
            "status": "0",
            "msg": "error al guardar reserva"
        })
    }
}

/**
 * recupera una reserva (GET/:id)
 * @param {*} req 
 * @param {*} res 
 */
reservaCtrl.getReserva = async (req, res) => {
    const reserva = await Reserva.findById(req.params.id);
    res.json(reserva);
};

/**
 * edita una reserva (PUT/:id)
 * @param {*} req 
 * @param {*} res 
 */
reservaCtrl.editReserva = async (req, res) => {
    const vreserva = new Reserva(req.body);
    try {
        await Reserva.updateOne({ _id: req.body._id }, vreserva);
        res.json({
            status: "1",
            msg: "Reserva Actualizada",
        });
    } catch (error) {
        res.status(400).json({
            status: "0",
            msg: "Error en la actualizacion",
        });
    }
};

/**
 * Borra una reserva (DELETE/:id)
 * @param {*} req 
 * @param {*} res 
 */
reservaCtrl.deleteReserva = async (req, res) => {
    try {
        const reserva =await Reserva.findById({_id:req.params.id})
        const usuario = await Usuario.findById({_id:reserva.usuario});
        const index = usuario.reservas.findIndex(reser => reser.equals(reserva._id));
        if (index !== -1){
            usuario.reservas.splice(index,1);
        }
        await Usuario.updateOne({_id:reserva.usuario},usuario);
        const servicio = await Servicio.findById({_id:reserva.servicio});
        const indexServicio= servicio.reservas.findIndex(serv=>serv.equals(reserva._id));
        if(indexServicio!==-1){
            servicio.reservas.splice(indexServicio,1);
        }
        await Servicio.updateOne({_id:reserva.servicio},servicio);
        await Reserva.deleteOne({ _id: req.params.id });
        res.json({
            status: "1",
            msg: "Reserva removida",
        });
    } catch (error) {
        res.status(400).json({
            status: "0",
            msg: "Error procesando la operacion",
        });
    }
};





module.exports = reservaCtrl;