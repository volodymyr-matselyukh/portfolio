const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const { createAdminUser } = require('../backend/services/UserService');

const messageRoutes = require("./api/routes/message");
const userRoutes = require("./api/routes/user");
const articleRoutes = require("./api/routes/article");

const connectionUri = 'mongodb+srv://volodymyrmatselyukh:' + process.env.MONGO_ATLAS_PW + '@portfolio.m8gvq5q.mongodb.net?retryWrites=true&w=majority';

mongoose.connect(connectionUri, { 
	useNewUrlParser: true,
	useUnifiedTopology: true
});

createAdminUser().then();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Credentials', true);

	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'POST');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		return res.status(200).json({});
	}

	next();
})

app.use(express.json());
app.use(cookieParser());
app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/article', articleRoutes);

app.get('/heartbeat', (req, res, next) => {
	res.status(200).json({"status": "I am alive"});
});

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;

	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);

	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;