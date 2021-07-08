const {response} = require('express')
const {ObjectId} = require('mongoose').Types;
const {Usuario,Categoria,Producto} = require('../models')


//Hago las validaciones directamente acá 
const colleccionesPermitidas = [
  'usuarios',
  'categoria',
  'productos',
  'roles'
]

//Búsqueda de c/u

const buscarUsuarios = async(termino = '',res = response)=>{
  const esMongoId = ObjectId.isValid(termino)
  if (esMongoId){
    const usuario = await Usuario.findById(termino)
    res.json({
      results : [usuario] ? [usuario] : []
    })
  }


  const regex = new RegExp(termino,'i')
  const usuarios = await Usuario.find({
    $or: [{nombre:regex},{correo:regex}],
    $and: [{estado:true}]
  })
  res.json({
    results : usuarios
  })
}

const buscarCategoria = async(termino='',res = response)=>{
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId){
    const categoria = await Categoria.findById(termino);
    res.json({
      results : [categoria] ? [categoria] : []
    })
  }

  const regex = new RegExp(termino,'i');
  const categorias = await Categoria.find({
    nombre:regex,estado:true
  })

  res.json({
    results : categorias
  })

}

const buscarProducto = async(termino='',res = response)=>{
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId){
    const producto = await Producto.findById(termino).populate('categoria','nombre');
    res.json({
      results : [producto] ? [producto] : []
    })
  }

  const regex = new RegExp(termino,'i');
  const productos = await Producto.find({nombre:regex,estado:true}).populate('categoria','nombre')
  res.json({
    results : productos
  })
}

const buscar  = (req,res=response) =>{

  const {coleccion,termino} = req.params

  if (!colleccionesPermitidas.includes(coleccion)){
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${colleccionesPermitidas}`})
  }


  switch (coleccion){
    case 'usuarios'   :
      buscarUsuarios(termino,res)
      break
    case 'categoria':
      buscarCategoria(termino,res)
      break
    case 'productos':
      buscarProducto(termino,res)
      break

    default:
      res.status(500).json({
        msg:'Se le olvidó hacer la búsqueda'})
  }

}


module.exports = {
  buscar
}