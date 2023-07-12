const mongoose = require('mongoose');

const login = require('./login');

const { Schema } = mongoose;

const AdminSchema = new Schema({
    ...login.schema.obj,
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    email: { type: String, require: true },
    dni: { type: String, require: true },
    fechaNacimiento: { type: String, require: true },
    edad: { type: Number, require: true },
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);