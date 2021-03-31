const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");


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


const googleSignIn = async(req,res=response) =>{
  const {id_token}=req.body;

  const {correo,nombre,img} = await googleVerify(id_token);
  //Verificar si el correo existe en bbdd
  let usuario = await Usuario.findOne({correo});
  // pueden pasar dos opciones el usuario ya registro el correo o no 

  if(!usuario){
    //debo crealo 
    const data = {
      nombre,
      correo,
      password:':P',
      img,
      google:true
    };
    usuario = new Usuario(data);
    await usuario.save();
  }

  // Si el usuairo en bbdd está en false niego auth
  if (!usuario.estado){
    res.status(401).json({msg:"Hable con admin, usuer bloqueda"})
  }

  //Generar el jwt 
  const token = await generarJWT(usuario.id);
  try {
    res.json({
      usuario,
      token
    })
  } catch (error) {
    res.status(400).json({
      msg:'Token de google no reconocido'
    })
  }
 
}


module.exports = {
  login,
  googleSignIn
}