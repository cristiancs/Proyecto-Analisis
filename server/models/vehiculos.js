const Sequelize = require('sequelize');

const vehiculos = sequelize.define('vehiculos', {
  id: Sequelize.INTEGER,
  empresa: Sequelize.INTEGER,
  patente: Sequelize.STRING,
  ruta: Sequelize.STRING,
});

export default User;