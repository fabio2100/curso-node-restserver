const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRoleValido = async(rol='')=>{
  const existeRol = await Role.findOne({rol});
  if(!existeRol){
    throw new Error(`El rol ${rol} no existe, no intente boludeces mostro`);
  }
}

const esMailValido = async(correo='')=>{
const existeEmail = await Usuario.findOne({correo});
  if (existeEmail){
    
    throw new Error(`El correo: ${correo} ya está registrado`)
  }
}


const existeUsuarioPorId = async(id='')=>{
  const existeUsuario = await Usuario.findById(id);

  if(!existeUsuario){
    throw new Error(`El id no está asignado a ningún usuario`)
  }
} 




module.exports = {
  esRoleValido,
  esMailValido,
  existeUsuarioPorId
}