const {Producto,Categoria,Usuario} = require('../models/');
const {Response} = require('express');

const obtenerProducto = async (req, res) => {
  const {id} = req.params;
  const producto =await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')
  if (!producto){
    return res.status(401).json({
      msg: "El id es incorrecto"
    })
  }
  return res.status(200).json({
    producto
  })
}

const obtenerProductos = async (req,res) => {
  const {limite=5,desde=0} = req.query;
  const query = {estado:true};

  const [total,productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
    .populate('usuario','nombre')
    .populate('categoria','nombre')
  ])

  res.status(200).json({
    total,
    productos
  })
}

const crearProducto = async (req,res) => {
  //Chekear producutoNombre, usuario y categoria-> he ahi el error
  const {estado, usuario, ...body} = req.body;

  

  const productoDB = await Producto.findOne({nombre:body.nombre});
  if (productoDB){
    return res.status(400).json({
      msg: `El producto ${nombre} ya existe en la BBDD`
    })
  }

  const data = {
    ...body,
    nombre:body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  }


  const producto = new Producto(data);
  console.log(producto)
  await producto.save();
  res.status(201).json({producto})
}

const actualizarProducto = async (req,res) =>{
  const {id} = req.params;
  const {estado,usuario,...resto} = req.body;

  resto.usuario = req.usuario._id;

  if(resto.nombre){
    resto.nombre.toUpperCase();
  }

  const producto = (await Producto.findByIdAndUpdate(id,resto,{new:true})).populate('usuario');

  res.status(201).json({
    producto,
    usuario
  })
}

const borrarProducto = async (req,res) => {
  const {id}=req.params;
  const {...resto} = req.body;
  resto.usuario = req.usuario._id;

  const producto = (await (Producto.findByIdAndUpdate(id,{estado:false},{new:true}))).populate('usuario');

  res.status(201).json({
    producto
  }) 
}

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
}

