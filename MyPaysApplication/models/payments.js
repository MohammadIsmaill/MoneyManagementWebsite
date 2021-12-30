const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    price: {
        type: Number,
        required: [true, 'price cannot be blank']
    },
    date: {
        type: String,
        required: [true, 'date cannot be blank']
    }
})

module.exports = mongoose.model('Payment', paymentSchema);