const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')


const Reunion = sequelize.define('reunion', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  horario: {
    type: Sequelize.STRING,
    allowNull: false
  },
   createdAt: {
    type: Sequelize.DATE,
    get() {
      return Moment(this.getDataValue('createdAt')).format('LLLL')
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    get() {
      return Moment(this.getDataValue('updatedAt')).format('LLLL')
    }
  },
  deletedAt: {
    type: Sequelize.DATE,
    get() {
      return Moment(this.getDataValue('deletedAt')).format('LLLL')
    }
  },

})

module.exports = Reunion