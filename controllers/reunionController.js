const reunionServices = require("../services/reunionServices")

exports.getAll = async (req, res, next) => {
  try {
    const resultado = await reunionServices.getAllReuniones()
    res.status(200).json({
      mensaje: "Elementos encontrados",
      elementos: resultado,
      total: resultado.length
    })

  } catch (error) {
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }

}
exports.addReunion = async (req, res, next) => {
  try {
    const resultado = await reunionServices.add(req.body)

    res.status(201).json({
      mensaje: "Una reunion fue creada correctamente",
      elementos: resultado
    })

  } catch (error) {
    next(error)
  }

}

exports.findById = async (req, res, next) => {
  const id = req.params.id
  try {
   const resultado = await reunionServices.getReunionById(id)
   res.status(200).json({
      mensaje: 'Elemento encontrado',
      elemento: resultado
  })
  } catch (error) {
    next(error);
  }
}

exports.editReunion = async (req, res, next) => {
  const id = req.params.id
  console.log(req.body)

  try {

    const servicio = await reunionServices.getReunionById(id)
    const resultado = await reunionServices.edit(req.body,servicio.id)
    res.status(200).json({
      mensaje: "La reunion fue editada correctamente",
      elementos: resultado,
    })

  } catch (error) {
    next(error)
  }

}

exports.delete = async (req, res, next) => {
  const id = req.params.id

  try {
    const resultado = await reunionServices.getReunionById(id);
    const resultadoDeleted = await reunionServices.delete(resultado)
      res.status(200).json({
          mensaje: 'Reunion eliminada.',
          resultado: resultadoDeleted
      })
  } catch (error) {
  next(error)
  }
}
