/* 
{
    name: 'asd',
    mail: 'asd@asd.com',
    password: '123456',
    img: '111111',
    rol: 'asd',
    estado: false,
    google: false
} */

const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    mail: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);