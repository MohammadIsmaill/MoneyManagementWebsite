const Payment = require('../models/payments');
const calculation = require('../controllers/calculations');

module.exports.showPayments = async (req, res) => {
    const payments = await Payment.find({});
    const total = calculation.totalPrice(payments);
    res.render('payments/payments', { payments,total });
}
module.exports.renderNewForm = (req, res) => {
    res.render('payments/new');
}
module.exports.createNewPayment = async (req, res) => {
    const { name, price, date } = req.body;
    const payment = new Payment({ name, price, date });
    await payment.save();
    res.redirect('/payments');
}
module.exports.renderEditForm = async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    res.render('payments/edit', { payment });
}
module.exports.updatePayment = async (req, res) => {
    const { name, price, date } = req.body;
    const newPayment = await Payment.findByIdAndUpdate(req.params.id, { name, price, date });
    res.redirect('/payments');
}
module.exports.deletePayment = async (req, res) => {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    res.redirect('/payments');
}
