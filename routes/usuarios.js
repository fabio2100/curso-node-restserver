const {Router}=require('express');
const { check } = require('express-validator');
const { usuariosGet, 
  usuariosPut, 
  usuariosPost, 
  usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido,
         esMailValido,
        existeUsuarioPorId } = require('../helpers/dbValidators');


//const { validarJWT } = require('../middlewares/validar-jwt');
//const { validarCampos } = require('../middlewares/validarCampos');
//const { esAdminRole, tieneRole } = require('../middlewares/validarRoles');

const {validarJWT,
      validarCampos,
      esAdminRole,
      tieneRole} = require('../middlewares')

const router = Router();

router.get('/', usuariosGet)

router.put('/:id',[
  check('id','No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut)

router.post('/', [
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('password','El password debe tener más de 6 letras').isLength({min:6}),
  check('correo','El correo no es válido').isEmail(),
  check('correo').custom(esMailValido),
  //check('rol','No es un rol válido').isIn(['ADMIN','USER']),
  check('rol').custom(esRoleValido),
  validarCampos
] ,usuariosPost)

router.delete('/:id',[
  validarJWT,
  //esAdminRole,
  tieneRole('ADMIN','VENTAS'),
  check('id','No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete)





module.exports = router;