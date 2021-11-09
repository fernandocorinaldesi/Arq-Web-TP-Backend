const mongoose = require("mongoose");
const Publicacion = require("../models/publicacion");
require('dotenv').config();
const URI = `mongodb://${process.env.DB_HOST_MONGO}:${process.env.DB_PORT_MONGO}/${process.env.DB_DATABASE_MONGO}`
const usuario = require("../models/usuario");
const { Client } = require('pg');

const postgresClient = new Client({
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST, 
})


init = async () => {
  try {
    await createPostgresDatabase();  
    await createPostgresModels();
    await createPostgresUser();
    await connectToMongo();
    await createExampleDocuments();
 
  } catch (err) {
    console.log(err);
  }
  finally {
    await usuario.sequelize.close();
    await mongoose.disconnect();
    console.log("Bases de datos desconectadas")
  }
};

createPostgresDatabase = async () => {
  try {
    await postgresClient.connect();
    await postgresClient.query('CREATE DATABASE test');
    console.log("Se creo la base de datos test en postgres");
   
} finally {
  postgresClient.end()
}

};

createPostgresModels = async () => {
  res = await usuario.sync({ force: true });
  console.log(res);
  console.log("Se creo la tabla usuario en postgres");
};

createPostgresUser = async () => {
  const nuevoUsuario = usuario.build({
    username: "unpaz",
    email: "unpaz@unpaz.edu.ar",
    rol: "usuario",
    password: usuario.encryptPassword("unpazprimerusuario"),
  });
  res = await nuevoUsuario.save();
  console.log(res);
  console.log("Se creo un usuario de ejemplo ");
};

connectToMongo = async () => {
  await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Conexión a MongoDB exitosa");
};

createExampleDocuments = async () => {

  const publicacion1 = new Publicacion({
    titulo: "tituloejemplo1",
    contenido: "contenidoejemplo1",
    imagen: "imagenejemplo1.jpg",
    usuario: "unpaz",
  });

  const publicacion2 = new Publicacion({
    titulo: "tituloejemplo2",
    contenido: "contenidoejemplo2",
    imagen: "imagenejemplo2.jpg",
    usuario: "unpaz",
  });

  const publicacion3 = new Publicacion({
    titulo: "tituloejemplo3",
    contenido: "contenidoejemplo3",
    imagen: "imagenejemplo3.jpg",
    usuario: "unpaz",
  });

  await publicacion1.save();
  await publicacion2.save();
  await publicacion3.save();

  console.log("Se insertaron publicaciones de ejemplo en MongoDb");
};

init();