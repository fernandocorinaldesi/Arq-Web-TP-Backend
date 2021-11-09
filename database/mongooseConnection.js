const mongoose = require('mongoose');
require('dotenv').config();
//string con el path de la base de datos, en caso de que no exista mongo la crea
const URI = `mongodb://${process.env.DB_HOST_MONGO}:${process.env.DB_PORT_MONGO}/${process.env.DB_DATABASE_MONGO}`

exports.getConnection = async () => {
    try {
      await mongoose.connect(URI,
        { useNewUrlParser: true ,useUnifiedTopology: true }
      );
      console.log('Conexión a la BD exitosa');
    } catch (err) {
      console.log('Fallo la conexión a la BD');
    }
  };

  