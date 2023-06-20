const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        nombre: String,
        apellido: String,
        dni: Number,
        anio: Number,
        carrera: String,
        contrasena: String,
    }
)

const User = model('User', userSchema);


module.exports = User;