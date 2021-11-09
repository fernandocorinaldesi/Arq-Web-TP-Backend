const Reunion = require("../models/reunion");

exports.getAllReuniones = async () => {

  resultado = await Reunion.findAll()

  return resultado
}

exports.getReunionById = async (id)  =>{
  resultado = await Reunion.findOne({ where: { id:id  } })
  return resultado
}

exports.add = async (body) => {

  resultado = await Reunion.create({
    titulo: body.titulo,
    descripcion: body.descripcion,
    horario: body.horario,
  })
  return resultado
}
exports.edit = async (body, id) => {

  resultado = await Reunion.update({
    titulo: body.titulo,
    descripcion: body.descripcion,
    horario: body.horario,
   }, { where: { id: id } })
  return resultado
}

exports.delete = async (reunion) => {
  const res = await reunion.destroy()
  return res
 };