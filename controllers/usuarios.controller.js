const { response } = require('express');

const usuariosGet = (req, res = response) => {

    //Query params son datos que se obtengann de la url
    const query = req.query;
    const { q, nombre = "no name", apikey } = req.query;

    res.json({
        msg: 'get API - Controlador',
        query,
        q,
        apikey,
        nombre
    })
}

const usuariosPut = (req, res = response) => {

    //req.params sirve para recibir un dato de ruta si queremos obtener algo es propia una funccion de express
    const { id } = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
    })
}

const usuariosPost = (req, res = response) => {

    //Destructuramos si solo queremos una parte del json
    const { nombre, edad } = req.body;
    //Aqui se enviar todo el objeto a diferencia de una destructuracion
    const body = req.body;

    res.json({
        msg: 'post API - Controlador',
        body,
        nombre,
        edad,
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}