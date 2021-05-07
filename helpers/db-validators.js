const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`EL rol ${rol} no esta en la base de datos`)
    }
}

//Verificar si el correo existe
const emailExiste = async(mail = '') => {
    const existemail = await Usuario.findOne({ mail });
    if (existemail) {
        throw new Error(`El email ${mail} ya esta registrado en la base de datos`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) { //si existe el id lo dejamos pasar, por eso negamos para que se vea el error
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}