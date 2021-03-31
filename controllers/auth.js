const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");


const login = async(req,res=response) =>{

  //extraer datos de req
  const {correo,password} = req.body;

  try {
    //verificar si mail existe
    const usuario = await Usuario.findOne({correo});
    if (!usuario){
      return res.status(400).json({
        msg:'Usuario/password no son correctos - correo denegado'
      });
    }
    //verficiar si usuario está activo en bbdd
    if (!usuario.estado){
      return res.status(400).json({
        msg:'Usuario/password no son correctos - estado false'
      });
    }
    //verificar password
    const validPassword = bcryptjs.compareSync(password,usuario.password);
    if (!validPassword){
      return res.status(400).json({
        msg:"Usuario password no son correctos - Password incorrecto"
      })
    }
    //generar token
    const token = await generarJWT(usuario.id);
    res.json({
      msg:'Login OK',
      correo,password,token
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg : 'Algo salió mal tratar de recuperar correo y password'
    })
    
  }

  
}



module.exports = {
  login
}