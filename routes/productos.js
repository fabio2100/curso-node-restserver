const {Router} = require('express');
const {check} = require('express-validator');
const { crearProducto,obtenerProducto,obtenerProductos,actualizarProducto,borrarProducto } = require('../controllers/productos');
const { esCategoriaValida, existeCategoriaPorId,existeProductoPorId } = require('../helpers/dbValidators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/',[
  validarJWT,
  validarCampos
],
obtenerProductos)//obtenerProductos);

router.get('/:id',[
  check('id','No es un id válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
],obtenerProducto)//obtenerProducto);


router.post('/',[
  validarJWT,
  check('nombre','El producto debe tener un nombre').not().isEmpty(),
  check('categoria','No es un id válido de Mongo').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
  check('precio').isNumeric(),
  validarCampos
],crearProducto);

router.put('/:id',[
  validarJWT,
  check('id','No es un id válido de mongo').isMongoId(),
  check('id','El id no está registrado con ningún producto').custom(existeProductoPorId),
  validarCampos
],actualizarProducto)

router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id','No es un id válido de mongo').isMongoId(),
  check('id','El id no está registrado a ningún producto').custom(existeProductoPorId),
  validarCampos
],borrarProducto)

module.exports = router