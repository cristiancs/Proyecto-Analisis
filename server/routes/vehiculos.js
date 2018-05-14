import express from 'express'
import { FORMERR } from 'dns';


const app = express.Router();

const vehiculos = [];


for(let i = 0; i < 4; ++i){
    vehiculos.push({
        id: i,
        empresa_id: 1,
        patente: `DJ23${i}`,
        ruta: 'Santiago - Concepción'
    })
}


app.get('/', (req, res) => {
    const { empresa_id } = req.query;
   
    res.status(200).json(vehiculos.filter(vehiculo => vehiculo.empresa_id == empresa_id ));
})



export default app