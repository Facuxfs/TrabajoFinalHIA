const mongoose = require('mongoose');

const login = require('./login');
const Reserva = require('./reserva');
const Resenia = require('./resenia');

const { Schema } = mongoose;
const UsuarioSchema = new Schema({
    ...login.schema.obj,//ATRIBUTOS HEREDADOS
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    dni: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    edad: { type: Number, required: true },
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: Reserva, required: false }],
    resenias: [{ type: mongoose.Schema.Types.ObjectId, ref: Resenia, required: false }]
})  

module.exports = mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema);