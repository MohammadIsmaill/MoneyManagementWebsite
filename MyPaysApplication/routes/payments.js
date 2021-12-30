const express = require('express');
const payment = require('../controllers/payments');
const router = express.Router();

router.get('/', payment.showPayments);
router.get('/new', payment.renderNewForm);
router.post('/new', payment.createNewPayment);
router.get('/edit/:id', payment.renderEditForm);
router.put('/edit/:id', payment.updatePayment);
router.delete('/delete/:id', payment.deletePayment);

module.exports = router;