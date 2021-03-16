const {response} = require('express')


const usuariosGet =function (req, res=response) {
  const {q,nombre='no name',api} = req.query;
  res.json({
    msg:"get API - controlador",
    q,
    nombre,
    api
  })
}

const usuariosPut = function (req, res=response) {
  const {id} = req.params;
  res.json({
    msg:"put API - controlador",
    id
  })
}

const usuariosPost = function (req,res=response){
  const {nombre,edad} = req.body;
  
  res.json({
    msg:"Post API - controlador",
    nombre,
    edad
  })
}

const usuariosDelete = function (req,res=response){
  res.json({
    msg:"Delete API - controlador"
  })
}


module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}