const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const sequelize = require('../database/sequelizeConnection')
const client =require('../database/redisConnection')

let token;
let id;

afterAll ((done)  => {
   mongoose.disconnect();
   sequelize.close()
   client.end()
  done();
});

it("Deberia retornar no encontrado, codigo 404", async () => {
  const res = await request(app).get("/404");
  expect(res.statusCode).toEqual(404);
});

it("Deberia retornar las publicaciones codigo 200", async () => {
  const res = await request(app).get("/publicaciones");
  expect(res.statusCode).toEqual(200);
});

/*it("Envio de Token en null,deberia retornar codigo 401,jwl malformed", async () => {
  const res = await request(app).get("/publicaciones").set("Authorization", `Bearer ${null}`);
  expect(res.statusCode).toBe(401);
});*/

it("Deberia fallar la registracion de nuevo usuario,codigo 422", async () => {
  const res = await request(app).post("/register").send({
    username: "u",
    password: "un",
  });
  expect(res.statusCode).toBe(422);
});

it("Deberia fallar la registrar un nuevo usuario porque ya existe ,codigo 422", async () => {
  const res = await request(app).post("/register").send({
    email: "unpaz@unpaz.edu.ar",
    username: "unpaz",
    password: "unpazprimerusuario",
    confirmarPassword: "unpazprimerusuario",
  });
  expect(res.statusCode).toBe(422);
});

it("Deberia retornar datos no validos de login, codigo 422", async () => {
  const res = await request(app).post("/usuarios/login").send({
    username: "",
    password: "",
  });
  expect(res.statusCode).toEqual(422);
});

it("Deberia retornar un login exitoso, codigo 200", async () => {
  const res = await request(app).post("/usuarios/login").send({
    username: "unpaz",
    password: "unpazprimerusuario",
  });
  token = res.body.token;
  expect(res.statusCode).toEqual(200);
});

it("Deberia no retornar la lista de publicaciones, codigo 500", async () => {
  const res = await request(app)
    .get("/publicaciones/" + "xxx")
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(500);
});

it("Deberia retornar la lista de publicaciones, codigo 200", async () => {
  const res = await request(app).get("/publicaciones").set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
});

it("Deberia fallar la creacion de una nueva publicacion ,usuario invalido codigo 422", async () => {
  const res = await request(app).post("/publicaciones").set("Authorization", `Bearer ${token}`).send({
    titulo: "probando 2",
    contenido: "probando jest 2",
    path: "probandojest2.jpg",
    usuario: "pepito",
  });
  expect(res.statusCode).toBe(422);
});

/*it("Deberia crear una nueva publicacion, codigo 201", async () => {
  const res = await request(app).post("/publicaciones").set("Authorization", `Bearer ${token}`).send({
    titulo: "probando 2",
    contenido: "probando jest 2",
    path: "probandojest2.jpg",
    usuario: "unpaz",
  });
  console.log("titulo : " + res.body.publicacion.titulo);
  id = res.body.publicacion._id;
  expect(res.statusCode).toBe(201);
});

it("Deberia retornar la nueva publicacion, codigo 200", async () => {
  const res = await request(app)
    .get("/publicaciones/" + id)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
});

it("Deberia editar la nueva publicacion, codigo 200", async () => {
  const res = await request(app)
    .put("/publicaciones/" + id)
    .set("Authorization", `Bearer ${token}`)
    .send({
      titulo: "probando editado",
      contenido: "probando editado 2",
      path: "probandojest2editado.jpg",
      usuario: "unpaz",
    });
  expect(res.statusCode).toBe(200);
});

it("Deberia borrar la publicacion creada, codigo 200", async () => {
  const res = await request(app)
    .delete("/publicaciones/" + id)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
});

it("Deberia fallar el borrado la publicacion creada, codigo 404", async () => {
  const res = await request(app)
    .delete("/publicaciones/" + id)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(404);
});*/

/*it("Deberia no encontrar la publicacion, codigo 404", async () => {
  const res = await request(app)
    .get("/publicaciones/" + id)
    .set("Authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(404);
});*/

it("Deberia fallar la creacion de una publicacion por la falta del campo titulo, datos invalidos, codigo 422", async () => {
  const res = await request(app).post("/publicaciones").set("Authorization", `Bearer ${token}`).send({
    contenido: "probando jest 2",
    path: "probandojest2.jpg",
    usuario: "unpaz",
  });
  expect(res.statusCode).toBe(422);
});

it("Deberia fallar la creacion de una publicacion por los campos vacios, datos invalidos, codigo 422", async () => {
  const res = await request(app).post("/publicaciones").set("Authorization", `Bearer ${token}`).send({
    titulo: "",
    contenido: "",
    path: "",
    usuario: "",
  });
  expect(res.statusCode).toBe(422);
});

/////XSS Y INJECIONES SQL//////

/*it("Deberia crear una nueva publicacion con los caracteres del titulo escapados, codigo 201", async () => {
  const res = await request(app).post("/publicaciones").set("Authorization", `Bearer ${token}`).send({
    titulo: "<alert>hola<alert>",
    contenido: "probando jest 2",
    path: "probandojest2.jpg",
    usuario: "unpaz",
  });
  expect(res.statusCode).toBe(201);
  expect(res.body.publicacion.titulo).toBe("&lt;alert&gt;hola&lt;alert&gt;");
});*/

it("Ejemplo 1 de inyeccion sql en el login, deberia retornar datos de acceso no válidos, codigo 401", async () => {
  const res = await request(app).post("/usuarios/login").send({
    username: `" or ""="`,
    password: `" or ""="`,
  });
  expect(res.statusCode).toEqual(401);
});

it("Ejemplo 2 de inyeccion sql en el login, deberia retornar datos de acceso no válidos, codigo 401", async () => {
  const res = await request(app).post("/usuarios/login").send({
    username: `105; DROP TABLE usuario`,
    password: `105; DROP TABLE usuario`,
  });
  expect(res.statusCode).toEqual(401);
});

it("Ejemplo 3 de inyeccion sql en el login, deberia retornar datos de acceso no válidos, codigo 401", async () => {
  const res = await request(app).post("/usuarios/login").send({
    username: `105 OR 1=1`,
    password: `105 OR 1=1`,
  });
  expect(res.statusCode).toEqual(401);
});

//})
