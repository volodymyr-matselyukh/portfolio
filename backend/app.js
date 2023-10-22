const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const messageRoutes = require("./api/routes/message");
const userRoutes = require("./api/routes/user");
const articleRoutes = require("./api/routes/article");

const connectionUri = 'mongodb+srv://volodymyrmatselyukh:' + process.env.MONGO_ATLAS_PW + '@portfolio.m8gvq5q.mongodb.net?retryWrites=true&w=majority';

const allowedReferers = ["https://matseliukh.com", "https://matseliukh-portfolio-front-end.fly.dev", "https://local.matseliukh.com:3000"];

mongoose.connect(connectionUri, { 
	useNewUrlParser: true,
	useUnifiedTopology: true
});

function trimEnd(string, charToRemove) {
    while(string.charAt(string.length-1)==charToRemove) {
        string = string.substring(0,string.length-1);
    }

    return string;
}

app.use((req, res, next) => {
	if(req?.headers?.referer)
	{
		let referrer = trimEnd(req.headers.referer, "/");

		console.log("referrer", referrer);

		if(allowedReferers.includes(referrer.toLowerCase()))
		{
			res.header('Access-Control-Allow-Origin', referrer);
		}
	}
	
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