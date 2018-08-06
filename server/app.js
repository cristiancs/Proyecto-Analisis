import express from 'express';
import Debug from 'debug';
import bodyParser from 'body-parser';

import { auth, vehiculos } from './routes';

const debug = new Debug("mw:root")
const app = express()
app.use('/public', express.static('public'));

/*if (process.env.NODE_ENV === 'development') {
	app.use((req, res, next) => {
	  res.setHeader('Access-Control-Allow-Origin', '*')
	  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
	  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
	  next()
	})
}*/
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
	next()
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
	debug("Petición");
	res.send("Hi2");
})

app.use("/api/auth", auth)
app.use("/api/vehiculos", vehiculos)

export default app
