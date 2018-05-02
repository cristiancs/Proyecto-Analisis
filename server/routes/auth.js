import express from 'express'


const app = express.Router();

const users = {
	id: 1,
	username: 'cris',
	password: '123'
}

app.get('/', (req, res) => {
	res.status(200).json(users);
})



export default app