const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	articles : [{ type: mongoose.Schema.ObjectId, ref: 'Article' }]
});

module.exports = mongoose.model('User', userSchema);