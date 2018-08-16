import express from 'express'
import csvWriter from 'csv-write-stream';
import fs from 'fs';
import touch from 'touch';
import sequalizeConnect from '../sequalizeConnect';
import * as jwt from 'jsonwebtoken';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = sequalizeConnect;


const Vehiculos = sequelize.define('vehiculos', {
    id: {type: Sequelize.INTEGER , primaryKey: true },
    empresa: Sequelize.INTEGER,
    patente: Sequelize.STRING,
    ruta: Sequelize.STRING,
    imei: Sequelize.INTEGER
}, { timestamps: false });

const Logs = sequelize.define('logs', {
    id: {type: Sequelize.INTEGER , primaryKey: true },
    time: Sequelize.DATE,
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
    if(isNaN(empresa_id)) {
        res.status(400).json({message : "Empresa id not supplied"})
    }
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
                        [Op.between]: ["2017-10-31", "2017-11-02"]
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

app.get('/gerente_graph', (req, res) => {
    const { empresa_id } = req.query;
    if(isNaN(empresa_id)) {
        res.status(400).json({message : "empresa_id id not supplied"})
    }

    function getRalenti(vehiculos, init, finish) {
        const toStore = [0, 0];
        return new Promise((resolve, reject) => {
             vehiculos.forEach(vehiculo => {
                Logs.findAll({
                    attributes: ['actual_speed', 'actual_engine_speed'],
                    where: {
                            imei: parseInt(vehiculo.imei),
                            time: {
                                [Op.between]: [init, finish]
                            }
                    }
                }).then(data => {
                    data.forEach(log => {
                        if(log.actual_speed == 0 && log.actual_engine_speed != 0) {
                            toStore[0] +=1;
                        } else if (log.actual_speed > 0) {
                            toStore[1] +=1;
                        }
                       
                    })

                    const suma = toStore[0] + toStore[1];
                    
                    resolve( toStore.map((data) => parseFloat( (data/suma)*100).toFixed(1) ) );
                    
                });
            });
        })
    }

    function getConsumption(vehiculos, month) {
        let initialData = {};
        let respuesta = [];
         return new Promise((resolve, reject) => {
            vehiculos.forEach(vehiculo => {
                Logs.findAll({
                    attributes: ['time','odometer', 'total_fuel'],
                    where: {
                        imei: parseInt(vehiculo.imei),
                        time: {
                            [Op.between] : [
                                new Date(2017, month, 1).toISOString().split("T")[0],
                                new Date(2017, month, 10).toISOString().split("T")[0]
                            ]
                        }
                    },
                    order: [['time', 'DESC']]
                }).then(data => {
                    if(data.length > 0) {
                        initialData[vehiculo.imei] = {};
                        initialData[vehiculo.imei].odometer = data[0].odometer;
                        initialData[vehiculo.imei].total_fuel = data[0].total_fuel;
                    }
                    Logs.findAll({
                        attributes: ['time','odometer', 'total_fuel'],
                        where: {
                            imei: parseInt(vehiculo.imei),
                             time: {
                                [Op.between] : [ 
                                    new Date(2017, month, -5).toISOString().split("T")[0], 
                                    new Date(2017, month, 0).toISOString().split("T")[0]
                                ]
                            }
                        },
                        order: [['time', 'ASC']]
                    }).then(data => {
                        if(data.length > 0 && typeof initialData[vehiculo.imei] !== "undefined") {
                            const kilometros = data[0].odometer - initialData[vehiculo.imei].odometer;
                            const litros = data[0].total_fuel - initialData[vehiculo.imei].total_fuel;
                            console.log("data[0].odometer", data[0].odometer);
                            console.log("initialData[vehiculo.imei].odometer", initialData[vehiculo.imei].odometer);
                            respuesta.push(kilometros/litros);
                        }
                        if(vehiculo.imei == vehiculos[vehiculos.length-1].imei) {
                            if(respuesta.length > 0) {
                                resolve([month, parseFloat(respuesta.reduce((a, b) => a + b, 0) / respuesta.length).toFixed(2) ])
                            } else {
                                resolve([month, 0]);
                            }
                            
                        }
                       
                    })
                })
            })
        })
            
    }
    Vehiculos.findAll({
      where: {
        empresa: parseInt(empresa_id),
      }
    }).then(vehiculos => {
        
        let ralenti_this_month = {};
        let ralenti_last_month = {};
        let promedios_combustible = {};
        const actual_month = 12;
        for (var i = actual_month - 6; i <= actual_month; i++) {
            getConsumption(vehiculos,i).then((data) => {
                const numero = data[0];
                const promedio = data[1];
                promedios_combustible[numero] = promedio;


                if(numero == actual_month) {
                    getRalenti(vehiculos, "2017-10-01", "2017-10-31", ralenti_this_month, ralenti_last_month)
                    .then((data) => {
                        ralenti_last_month = data;
                        getRalenti(vehiculos, "2017-11-01", "2017-11-31", ralenti_this_month, ralenti_last_month)
                        .then((data) => {
                            ralenti_this_month = data;
                            res.status(200).json({
                                ralenti: {ralenti_this_month, ralenti_last_month},
                                consumo: {ejes: Object.keys(promedios_combustible), datos: Object.values(promedios_combustible)}
                            });
                        });
                    })
                }
                
            })
            
            
        }
       
        

        

    });
})



app.post('/fetchData', (req, res) => {
    const {fecha_inicio, fecha_fin, id, datos, empresa_id} = req.body;
    if(isNaN(empresa_id)) {
        res.status(400).json({message : "Empresa id not supplied"})
    }
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
        console.log(datos.filter(item => item !== "id"));
        Logs.findAll({
            attributes: datos.filter(item => item !== "id"),
            where: {
                    imei: parseInt(vehiculos[0].imei),
                    time: {
                        [Op.between]: [fecha_inicio, fecha_fin]
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