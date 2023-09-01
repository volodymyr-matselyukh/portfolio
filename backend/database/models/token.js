const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	value: String
});

module.exports = mongoose.model('Token', tokenSchema);