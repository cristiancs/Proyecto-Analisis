const Sequelize = require('sequelize');

export default new Sequelize('multiwireless', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  //storage: './multiwireless.sqlite.db'
});