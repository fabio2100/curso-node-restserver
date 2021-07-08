const {Schema,model} = require('mongoose');

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true,'El nombre de la categoría es obligatorio'],
    unique:true
  },
  estado:{
    type:Boolean,
    default:true,
    required: true
  },
  usuario:{
    type:Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});


// si sobreescribo el metodo me devuelve todo el objeto usuario --> incluida info como password 
CategoriaSchema.methods.toJSON = function(){
  const {__v,_id,...categoria} = this.toObject();
  categoria.uid = _id;
  return categoria;
}
module.exports = model('Categoria',CategoriaSchema)