//schema y model 
const {Schema,model} = require('mongoose')


const usuarioSchema = Schema({
  nombre:{
    type: String,
    required: [true,'El nombre es obligatorio'] 
  },
  correo:{
    type: String,
    required: [true,'El correo es obligatorio'],
    unique:true
  },
  password : {
    type: String,
    required: [true,'El password es obligatorio']
  },
  img : {
    type: String,

  },
  rol: {
    type: String,
    required: true,
    default: 'USER',
    emun: ['ADMIN','USER']          //DEFINO los dos tipos posibles para asignarle 
  },
  estado: {
    type: Boolean,
    default: true
  },
  google : {
    type: Boolean,
    default: false
  }

});

usuarioSchema.methods.toJSON = function(){
  const {__v,password,_id,...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
}


module.exports = model('Usuario',usuarioSchema);










//class Usuario{
//  nombre='';
//  edad = 1;
//  correo='';
//
//  constructor(nombre='',edad=0,correo='') {
//    this.nombre=nombre;
//    this.edad = edad;
//    this.correo=correo;
//  }
//}

