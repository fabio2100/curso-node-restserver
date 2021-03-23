const mongoose = require('mongoose')

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true,
      useFindAndModify:false
    });
    console.log('BBDD online');

  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de iniciar la bbdd')
  }

}


module.exports = {
  dbConn
}