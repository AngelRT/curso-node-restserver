const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios.controller');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos,
], usuariosPut);

router.post('/', [
    //check('mail', 'El correo no es valido').isEmail(),
    check('mail').custom(emailExiste),
    check('name', 'El nombre es obligatorio').not().isEmpty(), //isEmpty es para decir que esta vacio pero al negar es como poner que no este vacio
    check('password', 'El password es obligatorio y debe ser de mas de 6 letras').isLength({ min: 6 }),
    //check('rol', 'No es un roll valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    /* es la misma funcion que arriba pero si una funcion su parametro es el mismo que recibe una segunda funcion solo se pone 
    el nombre de la segunda funcio
    check('rol').custom((rol) => esRolValido(rol)), */
    validarCampos,
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuariosDelete);


module.exports = router;