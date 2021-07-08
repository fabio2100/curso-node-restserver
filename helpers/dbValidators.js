const { Categoria,Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
//const {Producto} = require('../models/producto');

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

const esCategoriaValida = async(categoria = '') => {
  categoria = categoria.toUpperCase();
  const nombre = categoria;
  const existeCategoria = await Categoria.findOne({nombre});
  if (!existeCategoria){
    throw new Error(`La categoría ${categoria} no existe en la base de datos`)
  }
}

const existeUsuarioPorId = async(id='')=>{
  const existeUsuario = await Usuario.findById(id);

  if(!existeUsuario){
    throw new Error(`El id no está asignado a ningún usuario`)
  }
} 


const existeCategoriaPorId = async(id='')=>{
  const existeCategoria = await Categoria.findById(id);
  if(!existeCategoria){
    throw new Error(`El id indicado no está asociado a ninguna categoria id=${id}`)
  }
}

const existeProductoPorId = async(id='')=>{
  const existeProducto = await Producto.findById(id);
  if (!existeProducto){
    throw new Error(`El id ${id} no está asociado a ningún producto`)
  }
}


module.exports = {
  esRoleValido,
  esMailValido,
  existeUsuarioPorId,
  existeCategoriaPorId,
  esCategoriaValida,
  existeProductoPorId
}