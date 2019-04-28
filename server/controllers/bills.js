const billModel = require('../database/models/bills')
const userModel = require('../database/models/users')

module.exports = {
  getBills: function (req, res) {
    return userModel.findById(req.body.userId).populate({
      path: 'bills'
    }).exec((err, user) => {
      if (err)
        res.status(500).send(err)
      else 
        res.status(200).send(user.bills)
    })
  },

  getBill: function (req, res) {
    return billModel.findOne({ _id: req.query.billId}, (err, bill) => {
      if (err)
        res.status(500).send(err)
      else 
        res.status(200).send(bill)
    })
  },

  getProducts: function(req, res) {
    return userModel.findById(req.body.userId).populate({
      path: 'bills'
    }).exec((err, user) => {
      if (err)
        res.status(500).send(err)
      else {
        const bills = user.bills;
        let products = [];
        bills.forEach(bill => products = products.concat(Array.from(bill.products)));
        res.status(200).send(products);
      }
    })
  },

  createBill: function (req, res) {
    let bill = req.body
    if (bill) {
      billModel.create({
        name: bill.name,
        description: bill.description,
        products: bill.products,
        date: bill.date
      }).then((newBill) => {
        userModel.findById(bill.userId, (err, user) => {
          user.bills.push(newBill)
          user.save().then(() => {
            if (err)
              res.status(500).send(err)
            else
              res.sendStatus(200)
          })
        })
      })
    } else {
      res.status(400).send([])
    }
  },

  updateBill: function (req, res) {
    if (req.body.id) {
      billModel.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        description: req.body.description,
        products: req.body.products,
        date: req.body.date,
      }, (err, oldBill) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.sendStatus(200)
        }
      })
    } else {
      res.status(404).send([])
    }
  },

  removeBill: function (req, res) {
    if (req.body.id && req.body.userId) {
      userModel.findById(req.body.userId, (err, user) => {
        user.bills.pull(req.body.id)
        user.save().then((user) => {
          billModel.findByIdAndDelete(req.body.id, (err, deleted) => {
            if (err) {
              res.status(500).send(err)
            } else {
              res.sendStatus(200)
            }
          })
        })
      })
    } else {
      res.status(404).send([])
    }
  }
}