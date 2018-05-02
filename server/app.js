import express from 'express';
import Debug from 'debug';

import { auth } from './routes';

const debug = new Debug("mw:root")
const app = express()

app.get("/", (req, res) => {
	debug("Petición");
	res.send("Hi2");
})

app.use("/api/auth", auth)

export default app
