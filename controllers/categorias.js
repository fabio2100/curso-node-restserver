const {Categoria} = require('../models/')
const {response} = require('express');
const { findOne } = require('../models/categoria');
const {populate} = require('mongoose')
const {usuario} = require('../models/usuario')

//obtener categorias - paginado - total - populate(para relaciones db)-> moongose
const obtenerCategorias = async (req,res=response) => {
  const {limite=5,desde=0} = req.query;
  const query = {estado:true};
  const queryUser = 'usuario';

  const [total,categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
    .populate(queryUser,'nombre')
  ])

  res.status(200).json({
    total,
    categorias
  })
}


//obtener categoria - populate

const categoriasGetPorId = async (req,res=response) => {
  const {id} = req.params;
  const categoria = await Categoria.findById(id).populate('usuario','nombre');
  if(!categoria){
    return res.status(401).json({
      msg:'El id no es correcto'
    })
  }
  return res.status(200).json({
    categoria,
    usuario
  })
}


const categoriasPost = async function (req, res=response){
  const nombre = req.body.nombre.toUpperCase();

  //const categoria = new Categoria({nombre});
//
  //await categoria.save();
  //res.json(categoria,"Exito en la carga de nueva categoría");
  const categoriaDB = await Categoria.findOne({nombre});
  if (categoriaDB){
    return res.status(400).json({
      msg:`La categoría ${Categoria.nombre} ya existe en la bbdd`
    })
  }

  //Generar data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id
  }

  const categoria = new Categoria(data);
  await categoria.save();
  res.status(201).json({categoria})
}

//actualizar categoria - nombre 
const putCategoriaPorId=async(req,res=response)=>{
  const {id} = req.params;
  const{estado,usuario,...resto} = req.body;
  resto.usuario = req.usuario._id;
  resto.nombre = resto.nombre.toUpperCase();

  const categoria = (await Categoria.findByIdAndUpdate(id,resto,{new:true})).populate('usuario');

  res.status(201).json({
    categoria,
    usuario
  })
}

const deleteCategoriaPorId = async(req,res=response)=>{
  const {id} = req.params;
  const usuario = req.usuario;
  const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true}).populate('usuario');

  res.status(201).json({
    categoria,
    usuario
  })
}


//borrar categoria - estado a false 
module.exports = {
  categoriasPost,
  obtenerCategorias,
  categoriasGetPorId,
  putCategoriaPorId,
  deleteCategoriaPorId}