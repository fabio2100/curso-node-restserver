const esAdminRole = async (req,res,next) =>{
  if(!req.usuario){
    return res.status(500).json({
      msg:"Se quiere verificar el rol sin validar el token primero"
    });
  }

  const {rol,nombre} = req.usuario;
  if(rol != 'ADMIN'){
    return res.status(401).json({
      msg:`El usuario ${nombre} no tiene permiso para realizar la eliminación de usuarios-es USER`})
  }

  next();
}


const tieneRole = (...roles)=>{
  return (req,res,next)=>{
    if(!req.usuario){
      return res.status(500).json({
        msg:"Se quiere verificar el rol sin validar el token primero"
      });
    };

    if (!roles.includes(req.usuario.rol)){
      return res.status(401).json({
        msg:`El usuario ${req.usuario.nombre} no tiene permiso para realizar la eliminación de usuarios-El servicio requiere alguno de los sigs roles ${roles}`})
    }
    next();
  }
}


module.exports = {
  esAdminRole,
  tieneRole
}