const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../../database/sequelizeConnection')

const bcrypt = require('bcrypt-nodejs')

const Usuario = sequelize.define('usuario', {
    id: {  // es campo al ser serial y pk ,no es necesario especificarlo, dejar que sequelize lo maneje automaticamente
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rol: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    resetTokenExpiration: {
        type: Sequelize.DATE,
        allowNull: true
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
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true,
      get() {
        return Moment(this.getDataValue('lastLogin')).fromNow()
      }
    }
})

Usuario.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
  
Usuario.validPassword = function (usuario, password) {
    return bcrypt.compareSync(password, usuario.password)
}

module.exports = Usuario