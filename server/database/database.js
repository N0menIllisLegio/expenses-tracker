const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://gadfly:12345QWert@cluster-etamj.mongodb.net/ProjectDB'

mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose