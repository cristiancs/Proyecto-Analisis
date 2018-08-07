import express from 'express'
import csvWriter from 'csv-write-stream';
import fs from 'fs';
import touch from 'touch';

const app = express.Router();

const vehiculos = [];
let data = []

for(let i = 0; i < 4; ++i){
    vehiculos.push({
        id: i,
        empresa_id: 1,
        patente: `DJ23${i}`,
        ruta: 'Santiago - Concepción'
    })
}
function time_convert(num)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + ":" + minutes;         
}
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomCruiseActive(i) {
    if( parseInt(time_convert(i)[0], 10) % 3 == 0 ) {
        return 1;
    }
    return 0;
}
function generateData(cantidad, datos=[]) {
    const data = [];
    for(let i = 0; i < cantidad; ++i){
        let toPush = {};
        if(datos.length > 0) {
            
            datos.forEach((dato) => {
                switch(dato) {
                    case "Ts":
                        toPush[dato] = time_convert(i);
                        break;
                    case "Cruise active":
                        toPush[dato] = randomCruiseActive(i);
                        break;
                    case "Actual speed":
                        toPush[dato] = randomIntFromInterval(50, 60);
                        break;
                    case "Actual engine speed":
                        toPush[dato] = randomIntFromInterval(1000,9000);
                        break;
                    default:
                        toPush[dato] = parseInt(Math.random()*100)*i;
                        break;
                }
               
            })
        } else {
            toPush = {
                'Asset_id': parseInt(Math.random()*100)*i,
                'Ts': parseInt(Math.random()*100)*i,
                'Dev_id': parseInt(Math.random()*100)*i,
                'Odometer': parseInt(Math.random()*100)*i,
                'Total fuel*1': parseInt(Math.random()*100)*i,
                'Engine hours': parseInt(Math.random()*100)*i,
                'Actual speed': randomIntFromInterval(0, 90),
                'Actual engine speed': randomIntFromInterval(1000,9000),
                'Actual engine torque': parseInt(Math.random()*100)*i,
                'Kick down switch': parseInt(Math.random()*100)*i,
                'Accelerator pedal position': parseInt(Math.random()*100)*i,
                'Brake switch': parseInt(Math.random()*100)*i,
                'Clutch switch': parseInt(Math.random()*100)*i,
                'Cruise active': parseInt(time_convert(i)[1], 10) % 3 == 0 ? 0 : 1,
                'PTO active *2': parseInt(Math.random()*100)*i,
                'Fuel level': parseInt(Math.random()*100)*i,
                'Engine Temperatura': parseInt(Math.random()*100)*i,
                'Turbo pressure': parseInt(Math.random()*100)*i,
                'Axle weight 0': parseInt(Math.random()*100)*i,
                'Axle weight 1': parseInt(Math.random()*100)*i,
                'Axle weight 2': parseInt(Math.random()*100)*i
            }
        }
        data.push(toPush);
    }
    return data;
 
}

app.get('/', (req, res) => {
    const { empresa_id } = req.query;
   
    res.status(200).json(vehiculos.filter(vehiculo => vehiculo.empresa_id == empresa_id ));
})

app.get('/graph', (req, res) => {
    const { empresa_id, vehiculo } = req.query;
    data = generateData(1440, ["Ts", "Cruise active", "Actual speed", "Actual engine speed"]);
    
    const horas = data.map(el => el.Ts);
    const crucero = data.map(el => el["Cruise active"]);
    const velocidad = data.map(el => el["Actual speed"]);
    const rpm = data.map(el => el["Actual engine speed"]);
    res.status(200).json({horas, crucero, velocidad, rpm})
    


})



app.post('/fetchData', (req, res) => {
    const {fecha_inicio, fecha_fin, datos} = req.body;
    const empresa_id = 1;
    const ruta = `public/${(new Date).getTime()}.csv`;

    var writer = csvWriter()
    fs.closeSync(fs.openSync(ruta, 'w'));

    console.log("HI");
    data = generateData(10);

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