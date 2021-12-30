const express = require('express');
const debt = require('../controllers/debts');
const router = express.Router();

router.get('/', debt.showDebts)
router.get('/new', debt.renderNewForm);
router.post('/new', debt.createNewDebt);
router.get('/edit/:id', debt.renderEditForm);
router.put('/edit/:id', debt.updateDebt);
router.delete('/delete/:id', debt.deleteDebt);


module.exports = router;