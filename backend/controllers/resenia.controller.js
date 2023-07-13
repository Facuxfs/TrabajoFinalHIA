const Resenia = require('../models/resenia');
const Usuario = require('../models/usuario');
const Servicio = require('../models/servicio');
const reseniaCtrl = {}

reseniaCtrl.createResenia= async (req, res) => {

    try {
        var resenia = new Resenia(req.body);
        const usuario = await Usuario.findById({_id:req.body.usuario})
        await resenia.save();
        usuario.resenias.push(resenia._id);
        await Usuario.updateOne({_id:req.body.usuario},usuario);
        
        const servicio = await Servicio.findById({_id:req.body.servicio});
        servicio.resenia.push(resenia._id);
        await Servicio.updateOne({_id:req.body.servicio},servicio);

        res.status(200).json({
        'status': '1',
        'msg': 'Resenia guardado.'})
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.'+error
      })
    }
};
///mostrar uno solo
 
reseniaCtrl.getResenia = async (req, res) => {
    const resenia = await Resenia.findById(req.params.id);//.populate("servicio");
    //const resenia = await Resenia.findById(req.params.id).populate("reseniaUsuario");
    res.json(resenia);
};
 
/*reseniaCtrl.getResenias = async (req, res) => {//recupera todo
    var resenias = await Resenia.find().populate("reseniaServicio");
    //var resenias = await Resenia.find().populate("reseniaUsuario");
    res.json(resenias);
}*/


///**** muestra todas las renesnias con los id de usuario q lo creo y el id del servicio q realizo la resenia *****/
reseniaCtrl.getResenias = async (req, res) => {
    let criteria={};
     //filtro por Usuario
     if (req.query.usuario != null && req.query.usuario != "") {
        criteria.usuario=req.query.usuario;
     }
     //filtro por Servicio
     if (req.query.servicio != null && req.query.servicio != "") {
        criteria.servicio=req.query.servicio;
     }
     //filtro por Valoracion
     if (req.query.valoracion != null && req.query.valoracion != "") {
      criteria.valoracion=req.query.valoracion;
   }
    var resenias = await Resenia.find(criteria).populate('servicio').populate('usuario');
    res.json(resenias);
};

reseniaCtrl.deleteResenia= async (req, res)=>{
    try {
        const resenia = await Resenia.findById({_id:req.params.id});
        const usuario = await Usuario.findById({_id:resenia.usuario});
        const index = usuario.resenias.findIndex(rese=>rese.equals(resenia._id));
        if(index !== -1){
            usuario.resenias.splice(index,1);
        }
       await Usuario.updateOne({_id:resenia.usuario},usuario);
       
       const servicio = await Servicio.findById({_id:resenia.servicio});
       const indexServicio = servicio.resenia.findIndex(serv=>serv.equals(resenia._id))
       if(indexServicio !== -1){
           servicio.resenia.splice(indexServicio,1);
       }
      await Servicio.updateOne({_id:resenia.servicio},servicio);
      
       await Resenia.deleteOne({_id: req.params.id});
    res.json({
    status: '1',
    msg: 'Resenia removed'
    })
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion: '+error
    })
  }
};


reseniaCtrl.modificarResenia = async (req, res) => {
    const vresenia= new Resenia(req.body);
    try {
        await Resenia.updateOne({_id: req.body._id}, vresenia);
        res.json({
        'status': '1',
        'msg': 'Resenia updated'
    })
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion'
    })
  }
};

 
 

reseniaCtrl.getReseniasUsuario = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      const resenias = await Resenia.find({ usuario: usuarioId }).populate('servicio').populate('usuario');
      res.json(resenias);
    } catch (error) {
      console.error('Error al obtener las reseñas del usuario:', error);
      res.status(500).json({ error: 'Error al obtener las reseñas del usuario' });
    }
  };
  reseniaCtrl.getReseniasServicio = async (req, res) => {
    try {
      const { servicioId } = req.params;
      const resenias = await Resenia.find({ servicio: servicioId }).populate('servicio').populate('usuario');
      res.json(resenias);
    } catch (error) {
      console.error('Error al obtener las reseñas del servicio:', error);
      res.status(500).json({ error: 'Error al obtener las reseñas del servicio' });
    }
  };
 



module.exports = reseniaCtrl;