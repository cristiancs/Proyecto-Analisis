import express from 'express'
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

import sequalizeConnect from '../sequalizeConnect';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = sequalizeConnect;



const app = express.Router();

const Users = sequelize.define('users', {
  id: {type: Sequelize.INTEGER , primaryKey: true },
  empresa: Sequelize.INTEGER,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
}, { timestamps: false });

app.post('/login', (req, res) => {
	const { email, password } = req.body;
	Users.find({
      where: {
        email,
        password
      }
    }).then(user => {
    	if(user) {
    		console.log(user);
    		const jwtBearerToken = jwt.sign({
	        		role: user.role,
					empresa: user.empresa
				}, "LiUa7PtD5LSobeuDAmppmVqWtqfpXuvpNTP455hwShMSNN0WCWr2npQidAdeMvmQ", {
	                expiresIn: 120,
	                subject: user.id.toString(),
	                
	            }
	        );

			res.json({ "idToken": jwtBearerToken, expiresIn: 120, });
	    } else {
	        // send status 401 Unauthorized
	        res.sendStatus(401); 
	    }
	});
})



export default app