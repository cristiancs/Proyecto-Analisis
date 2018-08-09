import express from 'express'
import csvWriter from 'csv-write-stream';
import fs from 'fs';
import touch from 'touch';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    pool: {
        max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: './multiwireless.sqlite.db'
});


const Vehiculos = sequelize.define('vehiculos', {
    id: {type: Sequelize.INTEGER , primaryKey: true },
    empresa: Sequelize.INTEGER,
    patente: Sequelize.STRING,
    ruta: Sequelize.STRING,
    imei: Sequelize.INTEGER
}, { timestamps: false });

const Logs = sequelize.define('logs', {
    id: {type: Sequelize.INTEGER , primaryKey: true },
    time: Sequelize.STRING,
    ns1   : Sequelize.INTEGER,
    imei  : Sequelize.INTEGER,
    ns2   : Sequelize.STRING,
    odometer  : Sequelize.INTEGER,
    total_fuel    : Sequelize.INTEGER,
    engine_hours  : Sequelize.INTEGER,
    actual_speed  : Sequelize.INTEGER,
    actual_engine_speed   : Sequelize.INTEGER,
    engine_torque : Sequelize.INTEGER,
    kick_down_switch  : Sequelize.STRING,
    accelerator_pedal : Sequelize.INTEGER,
    brake_switch  : Sequelize.STRING,
    clutch_switch : Sequelize.STRING,
    cruise_active : Sequelize.STRING,
    pto_active    : Sequelize.INTEGER,
    fuel_level    : Sequelize.INTEGER,
    engine_temperature    : Sequelize.INTEGER,
    turbo_presure : Sequelize.INTEGER,
    axle_0    : Sequelize.INTEGER,
    axle_1    : Sequelize.INTEGER,
    axle_2    : Sequelize.INTEGER,
    axle_3    : Sequelize.INTEGER,
    service_distance  : Sequelize.INTEGER
}, { timestamps: false });


const app = express.Router();

const vehiculos = [];
let data = []

app.get('/', (req, res) => {
    const { empresa_id } = req.query;
    Vehiculos.findAll({
      where: {
        empresa: parseInt(empresa_id),
      }
    }).then(vehiculos => {
        res.status(200).json(vehiculos);
    });
})

app.get('/graph', (req, res) => {
    const { empresa_id, vehiculo } = req.query;
    if(isNaN(vehiculo)) {
        res.status(400).json({message : "Vehiculo id not supplied"})
    }
    Vehiculos.findAll({
      where: {
        id: parseInt(vehiculo),
      }
    }).then(vehiculos => {
        Logs.findAll({
            attributes: ['time', 'cruise_active', 'actual_speed', 'actual_engine_speed'],
            where: {
                    imei: parseInt(vehiculos[0].imei),
                    time: {
                        [Op.like]: "%2017-10-01%"
                    }
            }
        }).then(data => {
            const horas = data.map(el => el.time);
            const crucero = data.map(el => el.cruise_active == "t" ? 1 : 0);
            const velocidad = data.map(el => el.actual_speed);
            const rpm = data.map(el => el.actual_engine_speed);
            res.status(200).json({horas, crucero, velocidad, rpm})
        });

    });
})



app.post('/fetchData', (req, res) => {
    const {fecha_inicio, fecha_fin, id, datos} = req.body;
    const empresa_id = 1;
    const ruta = `public/${(new Date).getTime()}.csv`;
    console.log(datos);
    if(isNaN(id)) {
        res.status(400).json({message : "Vehiculo id not supplied"})
    }
    Vehiculos.findAll({
      where: {
        id: parseInt(id),
      }
    }).then(vehiculos => {
        Logs.findAll({
            attributes: [datos.filter(item => item !== "id")],
            where: {
                    imei: parseInt(vehiculos[0].imei),
                    time: {
                        [Op.like]: "%2017-10-01%"
                    }
            }
        }).then(data => {
            var writer = csvWriter()
            fs.closeSync(fs.openSync(ruta, 'w'));

            writer.pipe(fs.createWriteStream(ruta))
            data.forEach((linea) => {
                const respuesta = {};
                datos.forEach((dato) => {
                    if(datos.includes(dato)){
                        respuesta[dato] = linea[dato];
                    }
                })
                writer.write(respuesta);

            })
            writer.end()
            res.status(200).json({'url': `http://localhost:3000/${ruta}`});
        });

    });

    
    

})

export default app