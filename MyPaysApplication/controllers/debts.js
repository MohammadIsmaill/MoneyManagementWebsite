const Debt = require('../models/debts');
const calculation = require('../controllers/calculations');

module.exports.showDebts = async (req, res) => {
    const debts = await Debt.find({});
    const total = calculation.totalPrice(debts);
    res.render('debts/debts', { debts , total});
}
module.exports.renderNewForm = (req, res) => {
    res.render('debts/new');
}

module.exports.createNewDebt = async (req, res) => {
    const { name, price, date } = req.body;
    const newDebt = new Debt({ name, price, date });
    await newDebt.save();
    res.redirect('/debts');
}

module.exports.renderEditForm = async (req, res) => {
    const debt = await Debt.findById(req.params.id);
    res.render('debts/edit', { debt });
}

module.exports.updateDebt = async (req, res) => {
    const { name, price, date } = req.body;
    const newDebt = await Debt.findByIdAndUpdate(req.params.id, { name, price, date });
    res.redirect('/debts');
}

module.exports.deleteDebt = async (req, res) => {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    res.redirect('/debts');
}


