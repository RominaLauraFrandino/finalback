const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const adminSchema = new Schema(
    {
        nombre: String,
        contrasena: String,
    }
)


const Admin = model('Admin', adminSchema);


module.exports = Admin;