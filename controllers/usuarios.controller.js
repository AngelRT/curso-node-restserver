const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req, res = response) => {

    //Query params son datos que se obtengann de la url
    /* const query = req.query;
    const { q, nombre = "no name", apikey } = req.query;
 */
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

    /* al crear la coleccion de "Promise.all" ya no es necesario dejar este codigo porque en la coleccion
    estan las dos promesas y se retorna solo esa coleccion "resp" 
    const usuario = await Usuario.find(query)
        .skip(Number(desde)) //desde el numero que ingrese hasta el fin
        .limit(Number(limit)); // limite de datos que desea

    const total = await Usuario.countDocuments(query); */
    //le ponemos await aqui para que se ejecute despues de las dos promesas se ejecuten de manera simultanea
    //const (resp) = await Promise.all([
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
    ]);

    res.json({
        //resp arriba se destructuro el arreglo para poder ver los datos de manera mejor
        total,
        usuarios
        /* usuario,
        total */
    });
}

const usuariosPut = async(req, res = response) => {

    //req.params sirve para recibir un dato de ruta si queremos obtener algo es propia una funccion de express
    const { id } = req.params;
    const { _id, password, google, mail, ...resto } = req.body;

    // Validar contra base de datos
    if (password) { //si el password existe tal cosa
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    // aqui actualizamos el usuario por id donde actualizamos todo el "resto" por id
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

// post son datos que se reciben
const usuariosPost = async(req, res = response) => {

    //Valida el error que viene de los usuarios.routes

    //Destructuramos si solo queremos una parte del json
    //const { nombre, edad } = req.body;
    //Aqui se enviar todo el objeto a diferencia de una destructuracion
    const { name, mail, password, rol } = req.body;
    const usuario = new Usuario({ name, mail, password, rol });

    //aquie estaba la funcion de validar email que ahora esta en db-validator

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt); //sirve para crear una encriptacion de la pass


    await usuario.save();

    res.json({
        //msg: 'post API - Controlador',
        usuario
        //nombre
        //edad
    })
}

const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    //Aqui solo se cambia el estado para no borrarse
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json(
        usuario
    );
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}