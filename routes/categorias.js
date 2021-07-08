const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {categoriasPost,obtenerCategorias,categoriasGetPorId,
      putCategoriaPorId,
    deleteCategoriaPorId} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/dbValidators');
const { tieneRole } = require('../middlewares');

const router = Router();


//Obtener todas las categorías - publico
router.get('/',obtenerCategorias)

//Obtener una categoría por id - publico 
//hacer middleware personalizado  para todos los q requieren id put,getid,delete
//check('id').custom(existeCategoria) => si no existe debe tirar error 
//en helpers 
router.get('/:id',[
  check('id','No es un id válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
],categoriasGetPorId)

//Crear categoría - privado - con cualquier rol
router.post('/', 
  [
    validarJWT,
    check('nombre','La categoría debe tener un nombre').not().isEmpty(),
    validarCampos
  ],categoriasPost)


//Actualizar categoría por id - privado - cualquier rol
router.put('/:id',[
  validarJWT,
  check('nombre','El nombre de la categoría es obligatorio para actualizar').not().isEmpty(), //exigo el nombre de la categoría para actualziar (es el único campo posible de actualizar)
  check('id').custom(existeCategoriaPorId),
  validarCampos
],putCategoriaPorId)

//Borrar categoría por id - privado - solo admin  Borrado actual
router.delete('/:id',[
  validarJWT,
  tieneRole('ADMIN'),
  check('id','No es un id válido de mongo').isMongoId(),
  validarCampos
],deleteCategoriaPorId)

module.exports = router