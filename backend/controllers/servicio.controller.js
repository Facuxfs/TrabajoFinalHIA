const Servicio = require('../models/servicio');
const Gestor = require('../models/gestor');
const Resenia = require('../models/resenia');
const Reserva = require('../models/reserva');
const servicioCtrl = {}


servicioCtrl.getServicios = async (req, res) => {
    let criteria={};

    //filtro por ubicacion
    if (req.query.ubicacion != null && req.query.ubicacion != "") {
        criteria.ubicacion=req.query.ubicacion;
    }
    //filtro por categoria
    if (req.query.categoria != null && req.query.categoria != "") {
        criteria.categoria=req.query.categoria;
    }
    //filtro por gestor
    if (req.query.gestor != null && req.query.gestor != "") {
        criteria.gestor=req.query.gestor;
    }

     //filtro por nombre
     if (req.query.nombre != null && req.query.nombre != "") {
        criteria.nombre=req.query.nombre;
    }
    var servicios = await Servicio.find(criteria);
    res.json(servicios);
  };


  
servicioCtrl.getServicio = async (req, res) => {
    const servicio = await Servicio.findById(req.params.id);
    res.json(servicio);
  };

servicioCtrl.getServicioGestor= async(req,res)=>{
    try {
         let criteria={}
         if((req.query.gestor!==null && req.query.gestor!=="") && (req.query.categoria!==null && req.query.gestor!=="")){
            criteria.gestor=req.query.gestor;
            criteria.categoria=req.query.categoria;
         }
         const servicio = await Servicio.find(criteria);
        res.json(servicio);
    } catch (error) {
        res.json({
            status:0,
            msg:"Error al buscar servicios de gector"+error
        })
    }
}

servicioCtrl.getServicioNombre= async(req,res)=>{
    try {
           const criteria={}
           if((req.query.gestor!== null && req.query.gestor!=="")&&(req.query.nombre!==null && req.query.nombre!=="")){
            criteria.gestor= req.query.gestor;  
            criteria.nombre=req.query.nombre
           }
          const servicio = await Servicio.find(criteria);
          res.json(servicio)
    } catch (error) {
        res.json({
            status:0,
            msg:"Error al buscar Servicio por nombre "+error
        })
    }
}
  

servicioCtrl.getServiciosLocalidad = async (req, res) => {
    try {
        let criteria = {};
        if ((req.query.ubicacion != null) && (req.query.ubicacion != "")) {
            criteria.ubicacion = req.query.ubicacion;
        }
        var servicios = await Servicio.find(criteria);
        res.json(servicios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los servicios.', error });
    }
  };


servicioCtrl.createServicio = async (req, res) => {
    var servicio = new Servicio(req.body);
    try {
        await servicio.save();
        const gestor= await Gestor.findById({_id:req.body.gestor});
        gestor.servicio.push(servicio._id);
        await Gestor.updateOne({_id:req.body.gestor},gestor);
        res.json({
            'status': '1',
            'msg': 'Servicio guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

servicioCtrl.editServicio = async (req, res) => {
    try {
        const { id } = req.params;
        req.body;
        await Servicio.findByIdAndUpdate( { _id: id },req.body, {new: true,});
      
        res.json({
            status: '1',
            msg: 'Servicio Modifiado'
        });

    } catch (err) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
};

servicioCtrl.deleteServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id)
        const gestor = await Gestor.findById(servicio.gestor);
        const index = gestor.servicio.findIndex(res=>res.equals(servicio._id))
        if(index !== -1){
            gestor.servicio.splice(index,1);
        }
        await Gestor.updateOne({_id: servicio.gestor},gestor);

        for(let resenia of servicio.resenia){
            await Resenia.deleteOne({_id:resenia});
        }

        for(let reserva of servicio.reservas){
            await Reserva.deleteOne({_id:reserva});
        }

        await Servicio.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Servicio eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'+error
        })
    }
}


module.exports = servicioCtrl;