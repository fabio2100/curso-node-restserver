const {response} = require('express')
const bcryptjs = require('bcryptjs');
//Le pongo mayuscula a usuario porq vamos a crear instancias... parece q el modelo es un equivalente de clase
const Usuario = require('../models/usuario');
const { findByIdAndDelete } = require('../models/usuario');


const usuariosGet =async function (req, res=response) {
  //const {q,nombre='no name',api} = req.query;
  const {limite=5,desde=0} = req.query;
  const query = {estado:true};
  //const usuarios = await Usuario.find(query)
  //  .skip(Number(desde))
  //  .limit(Number(limite));
  //
  //const total = await Usuario.countDocuments(query);
//
  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ])

  res.json({
    total,
    usuarios
  })


}

const usuariosPut = async function (req, res=response) {
  const {id} = req.params;
  const {_id,password,google,correo,...resto} = req.body;

  //todo validar contra bbdd

  if(password){
    const salt = bcryptjs.genSaltSync(); //default 10
    resto.password = bcryptjs.hashSync(password,salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id,resto)

  res.json({
    msg:"put API - controlador",
    usuario
  })
}

const usuariosPost = async function (req,res=response){

  

  const {nombre,correo,password,rol} = req.body;
  //Acá creo la instancia de usuario--> lo bueno al enviar el body... se crean los atts automaticamnete, se ignoran los definidos que no pertenezcan a la classe
  const usuario = new Usuario({nombre,correo,password,rol})
  //Acá vienen todas las verificaciones de los datos 
  //correo si existe
   


  //encriptación de password
  const salt = bcryptjs.genSaltSync(); //default 10
  usuario.password = bcryptjs.hashSync(password,salt);
  
  //Acá grabamos en mongo
  
  await usuario.save();
  res.json({
    msg:"Post API - Éxito en la carga",
    usuario
  })
}

const usuariosDelete =async function (req,res=response){
  const {id} = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

  res.json({
    msg:"put DELETE - Estado en false",
    usuario
  })
}


module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}