const { validationResult } = require('express-validator');

//los middlewares suelen tener un tercer argumento a llamar si el midle pasa es NEXT 
const validarCampos = (req,res,next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(errors);
  }
  next();
}


module.exports = {
  validarCampos
}