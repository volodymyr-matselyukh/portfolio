const express = require('express');
const app = express();
require('dotenv').config();

const messageRoutes = require("./api/routes/message");

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