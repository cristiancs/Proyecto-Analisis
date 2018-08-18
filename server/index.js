import Debug from 'debug';
import app from './app'
const PORT = 3000;
const debug = new Debug("mw:root")

app.listen(PORT, ()=>{
	console.log("Express Server Started.")
	debug(`Server running  at port ${PORT}`)
})