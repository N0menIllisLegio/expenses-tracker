const express = require('express')
const router = express.Router()
const billsController = require('../controllers/bills')

router.get('/bills', billsController.getBills)
router.get('/bill', billsController.getBill)
router.get('/products', billsController.getProducts)

router.post('/bill', billsController.createBill)
router.patch('/bill', billsController.updateBill)
router.delete('/bill', billsController.removeBill)

module.exports = router