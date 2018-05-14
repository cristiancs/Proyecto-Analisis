import express from 'express'
import csvWriter from 'csv-write-stream';
import fs from 'fs';
import touch from 'touch';

const app = express.Router();

const vehiculos = [];
const data = []

for(let i = 0; i < 4; ++i){
    vehiculos.push({
        id: i,
        empresa_id: 1,
        patente: `DJ23${i}`,
        ruta: 'Santiago - Concepción'
    })
}

for(let i = 0; i < 4; ++i){
    data.push({
        'Asset_id': parseInt(Math.random()*100)*i,
        'Ts': parseInt(Math.random()*100)*i,
        'Dev_id': parseInt(Math.random()*100)*i,
        'Odometer': parseInt(Math.random()*100)*i,
        'Total fuel*1': parseInt(Math.random()*100)*i,
        'Engine hours': parseInt(Math.random()*100)*i,
        'Actual speed': parseInt(Math.random()*100)*i,
        'Actual engine speed': parseInt(Math.random()*100)*i,
        'Actual engine torque': parseInt(Math.random()*100)*i,
        'Kick down switch': parseInt(Math.random()*100)*i,
        'Accelerator pedal position': parseInt(Math.random()*100)*i,
        'Brake switch': parseInt(Math.random()*100)*i,
        'Clutch switch': parseInt(Math.random()*100)*i,
        'Cruise active': parseInt(Math.random()*100)*i,
        'PTO active *2': parseInt(Math.random()*100)*i,
        'Fuel level': parseInt(Math.random()*100)*i,
        'Engine Temperatura': parseInt(Math.random()*100)*i,
        'Turbo pressure': parseInt(Math.random()*100)*i,
        'Axle weight 0': parseInt(Math.random()*100)*i,
        'Axle weight 1': parseInt(Math.random()*100)*i,
        'Axle weight 2': parseInt(Math.random()*100)*i
    })
}

app.get('/', (req, res) => {
    const { empresa_id } = req.query;
   
    res.status(200).json(vehiculos.filter(vehiculo => vehiculo.empresa_id == empresa_id ));
})


app.post('/fetchData', (req, res) => {
    const {fecha_inicio, fecha_fin, datos} = req.body;
    const empresa_id = 1;
    const ruta = `public/${(new Date).getTime()}.csv`;

    var writer = csvWriter()
    fs.closeSync(fs.openSync(ruta, 'w'));

    console.log("HI");

    writer.pipe(fs.createWriteStream(ruta))
    data.forEach((linea) => {
        const respuesta = {};
        datos.forEach((dato) => {
            if(datos.includes(dato)){
                respuesta[dato] = linea[dato];
            }
        })
        console.log(respuesta);
        writer.write(respuesta);

    })
    writer.end()
    res.status(200).json({'url': `http://localhost:3000/${ruta}`});
    

})

export default app