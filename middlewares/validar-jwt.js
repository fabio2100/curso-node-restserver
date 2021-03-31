const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

//los tokens se acostumbran a mandar en los headers
const validarJWT = async (req,res=response,next) => {
  const token = req.header('x-token');
  if (!token){
    return res.status(401).json({
      msg:"No hay token en la petición"
    })
  }
  try {
    const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY); 
    const usuario = await Usuario.findById(uid);
    if (!usuario ){
      return res.status(401).json({
        msg:'Token no válido - usuario inexistente en bbdd'})
    
    }
    if (!usuario.estado){
      return res.status(401).json({
        msg:'Token no válido - usuario en estado false'})
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg:'Token no válido'
    })
  }
}


module.exports = {
  validarJWT
}