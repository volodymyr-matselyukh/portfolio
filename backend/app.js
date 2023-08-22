const express = require('express');
const app = express();
const mongoose = require('mongoose');

const messageRoutes = require("./api/routes/message");

const connectionUri = 'mongodb+srv://volodymyrmatselyukh:' + process.env.MONGO_ATLAS_PW + '@portfolio.m8gvq5q.mongodb.net/?retryWrites=true&w=majority';

//mongoose.connect('mongodb://volodymyrmatselyukh:'+ process.env.MONGO_ATLAS_PW +'@portfolio.m8gvq5q.mongodb.net',
mongoose.connect(connectionUri);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');

	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'POST');
		return res.status(200).json({});
	}

	next();
})

app.use(express.json()); 
app.use('/message', messageRoutes);

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