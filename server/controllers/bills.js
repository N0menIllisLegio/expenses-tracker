const billModel = require('../database/models/bills')
const userModel = require('../database/models/users')

module.exports = {
  getBills: function (userId) {
    return userModel.findById(userId).populate({
      path: 'cards',
      options: {
        sort: {
          'createdAt': -1
        }
      }
    }).exec()
  },
  
  createBill: function (bill) {
    if (bill && bill.name) {
      return billModel.create({
        name: bill.name,
        description: bill.description,
        date: bill.date
      }).then((newBill) => {
        return userModel.findById(bill.userId).exec().then((user) => {
          user.bills.push(newBill)
          return user.save()
        })
      })
    } else {
      return Promise.reject()
    }
  },

  updateBill: function (id, updBill) {
    if (id && updBill) {
      return billModel.findByIdAndUpdate(id, updBill).exec()
    } else {
      return Promise.reject()
    }
  },

  removeBill: function (id, userId) {
    if (id && userId) {
      return userModel.findById(userId).exec().then((user) => {
        user.bills.pull(id)
        user.save().then(() => {
          return billModel.findByIdAndDelete(id)
        })
      })
    } else {
      return Promise.reject()
    }
  }
}