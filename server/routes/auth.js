import express from 'express'
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

import sequalizeConnect from '../sequalizeConnect';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = sequalizeConnect;



const app = express.Router();

const users = [
	{
		id: 1,
		email: 'c@c.com',
		password: '123',
		role: 'gerente',
		empresa: 1,
	}
]

app.post('/login', (req, res) => {
	const { email, password } = req.body;

    if (users[0].email == email) {
		const user = users[0];
        const jwtBearerToken = jwt.sign({
        		role: user.role,
				empresa: user.empresa
			}, "LiUa7PtD5LSobeuDAmppmVqWtqfpXuvpNTP455hwShMSNN0WCWr2npQidAdeMvmQ", {
                expiresIn: 120,
                subject: user.id.toString(),
                
            }
        );

		res.json({ "idToken": jwtBearerToken, expiresIn: 120, });
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }
})



export default app