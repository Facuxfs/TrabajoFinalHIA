const Gestor = require('../models/gestor');
const gestorCtrl = {}

/**
 * Recupera TODOS los Gestores (GET)
 * @param {*} req 
 * @param {*} res 
 */
gestorCtrl.getGestores = async (req, res) => {
    let criteria = {};
    //Buscar Gestor por username
    if(req.query.username != null && req.query.username != ""){
        criteria.username=req.query.username;
    }
    //Buscar por dni
    if(req.query.dni != null && req.query.dni != ""){
        criteria.dni=req.query.dni;
    }
    //Buscar por email
    if(req.query.email != null && req.query.email != ""){
        criteria.email=req.query.email;
    }
    var gestores = await Gestor.find(criteria);
    res.json(gestores);
    
}

/**
 * Recupera un Gestor (GET)
 * @param {*} req 
 * @param {*} res 
 */
gestorCtrl.getGestor = async (req, res) => {
    const gestor = await Gestor.findById(req.params.id);
    res.json(gestor);
}

/**
 * Da de alta un Gestor (POST)
 * @param {*} req 
 * @param {*} res 
 */
gestorCtrl.createGestor = async (req, res) => {
    var gestor = new Gestor(req.body);
    
    try {
        await gestor.save();

        res.json({
            'status': '1',
            'msg': 'Gestor registrado con exito.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al intentar registrar un Gestor.'
        })
    }
}

/**
 * Elimina un Gestor (DELETE) * 
 * @param {*} req 
 * @param {*} res 
 */
gestorCtrl.deleteGestor = async (req, res) => {
    try {
        await Gestor.deleteOne({ _id: req.params.id });
        
        res.json({
            status: '1',
            msg: 'Gestor removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al intentar eliminar un Gestor'
        })
    }
}

/**
 * Modifica un Gestor (PUT)
 * @param {*} req 
 * @param {*} res 
 */
gestorCtrl.editGestor = async (req, res) => {
    const gestor = new Gestor(req.body);

    try {
        await Gestor.updateOne({ _id: req.body._id }, gestor);

        res.json({
            'status': '1',
            'msg': 'Gestor updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al intentar modificar un Gestor'
        })
    }
}

module.exports = gestorCtrl;
