const mongoose = require('mongoose');
const Servicio = require('./servicio');
const Usuario = require('./usuario');

const { Schema } = mongoose;

const ReseniaSchema = new Schema({
    valoracion: { type: Number, required: true },//valorar de 1 a 5
    fechaAlta: { type: String, required: true },
    imagen: { type: String},// required: true },// para insertar una imagen no es requerido por ser una opcion
    comentario: { type: String, required: true },//comentario de una resenia 
    servicio: { type: Schema.Types.ObjectId, ref: 'Servicio', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }

})

module.exports = mongoose.models.Resenia || mongoose.model('Resenia', ReseniaSchema);