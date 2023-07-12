const mongoose = require('mongoose');

const login = require('./login');
const servicio = require('./servicio');

const { Schema } = mongoose;

const GestorSchema = new Schema({
    ...login.schema.obj,
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    email: { type: String, require: true },
    dni: { type: String, require: true },
    fechaNacimiento: { type: String, require: true },
    edad: { type: Number, require: true },
    servicio: [{ type:mongoose.Schema.Types.ObjectId, ref: servicio, require: true }]
})

module.exports = mongoose.models.Gestor || mongoose.model('Gestor', GestorSchema);