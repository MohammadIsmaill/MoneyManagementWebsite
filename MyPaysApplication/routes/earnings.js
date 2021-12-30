const express = require('express');
const debts = require('../models/debts');
const Earning = require('../models/earnings');
const router = express.Router();


function totalPrice(arr) {
    let sum = 0;
    for (let element of arr) {
        sum += element.price;
    }
    return sum;
}
router.get('/', async (req, res) => {
    const earnings = await Earning.find({});
    const total = totalPrice(earnings);
    res.render('earnings/earnings', { earnings ,total});
})

router.get('/new', (req, res) => {
    res.render('earnings/new')
})
router.post('/new', async (req, res) => {
    const { name, price, date } = req.body;
    const earning = new Earning({ name, price, date });
    await earning.save();
    res.redirect('/earnings');
})
router.get('/edit/:id', async (req, res) => {
    const earning = await Earning.findById(req.params.id);
    res.render('earnings/edit', { earning });
})
router.put('/edit/:id', async (req, res) => {
    const { name, price, date } = req.body;
    const newEarning = await Earning.findByIdAndUpdate(req.params.id, { name, price, date });
    res.redirect('/earnings');
})

router.delete('/delete/:id', async (req, res) => {
    const earning = await Earning.findByIdAndDelete(req.params.id);
    res.redirect('/earnings');
})

module.exports = router;