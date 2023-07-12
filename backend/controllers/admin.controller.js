const Admin = require('../models/admin');
const AdminCtrl = {}

/**
 * Recupera TODOS los Administradores (GET)
 * @param {*} req 
 * @param {*} res 
 */
AdminCtrl.getAdmins = async (req, res) => {
    var admins = await Admin.find();

    res.json(admins);
}

/**
 * Recupera un Admin (GET)
 * @param {*} req 
 * @param {*} res 
 */
AdminCtrl.getAdmin = async (req, res) => {
    var admin = await Admin.findById(req.params._id);
    res.json(admin);
}

/**
 * Da de alta un Admin (POST)
 * @param {*} req 
 * @param {*} res 
 */
AdminCtrl.createAdmin = async (req, res) => {
    var admin = new Admin(req.body);
    try {
        await admin.save();
        res.json({
            'status': '1',
            'msg': 'Administrador registrado con exito.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al intentar registrar un Administrador.'
        })
    }
}

/**
 * Elimina un Administrador (DELETE) * 
 * @param {*} req 
 * @param {*} res 
 */
AdminCtrl.deleteAdmin = async (req, res) => {
    try {
        await Admin.deleteOne({ _id: req.params.id });
        
        res.json({
            status: '1',
            msg: 'Admin removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al intentar eliminar un Administrador'
        })
    }
}

/**
 * Modificar un Administrador (PUT)
 * @param {*} req 
 * @param {*} res 
 */
AdminCtrl.editAdmin = async (req, res) => { 
    const admin = new Admin(req.body);
    try {
        await Admin.updateOne({ _id: req.body._id }, admin);

        res.json({
            'status': '1',
            'msg': 'Administrador updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al intentar modificar un Administrador'
        })
    }
}

module.exports = AdminCtrl;
