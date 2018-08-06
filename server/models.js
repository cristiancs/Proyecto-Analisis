const Sequelize = require('sequelize');
const connection = new Sequelize('proyecto','root','password',{
	host:'localhost',
	dialect: 'mysql',
	operatorsAliases: false,

});

const db ={};

connection.sync();

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

	db.vehiculo = connection.define('vehiculo', {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false
		},
		empresa_id: {
			type: Sequelize.STRING,
			allowNull: false
		},
		patente: {
			type: Sequelize.STRING,
			allowNull: false
		},
		ruta: {
			type: Sequelize.STRING,
			allowNull: true
		}
		});
	
	
	module.exports = db;