const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const MsCustomerSchema = new Schema({
    full_name: {type: String, required: true, uppercase: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now}
});

MsCustomerSchema.pre('save', async function(next) {
    let msCustomer = this;
    if(!msCustomer.isModified('password')) return next();

    msCustomer.password = await bcrypt.hashSync(msCustomer.password);
    return next();
});

module.exports = mongoose.model('MsCustomer',MsCustomerSchema);