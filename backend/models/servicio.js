const mongoose = require('mongoose');

const Resenia = require('./resenia');
const Recerva = require('./reserva');
const Gestor = require('./gestor');
const { Schema } = mongoose;

const ServicioSchema = new Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    ubicacion: { type: String, required: true },
    calificacionTotal: { type: Number, required: true },
    gestor: { type: String, required: true },   //cambio de atributo gestor a solo el id de un gestor
    //gestor: { type: mongoose.Schema.Types.ObjectId, ref: Gestor, required: true },
    resenia: [{ type: mongoose.Schema.Types.ObjectId, ref: Resenia, required: false }],
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: Recerva, required: false }]
})

module.exports = mongoose.models.Servicio || mongoose.model('Servicio', ServicioSchema);