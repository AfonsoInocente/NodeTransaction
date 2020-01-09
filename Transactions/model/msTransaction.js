const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsTransactionSchema = new Schema({
    user_id: {type: String, required: true},
    payment_service: {type: String, required: true},
    payment_token: {type: String, required: true},
    amount: {type: Number, required: true},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('MsTransaction',MsTransactionSchema);