const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Payment = require('./models/payments');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
// const Redis = require('ioredis');
// const Payments = require('./models/payments');


// const redis = new Redis();


const port = parseInt(process.argv[2] || '3000');


// Routes
const paymentRoutes = require('./routes/payments');
const debtRoutes = require('./routes/debts');
const earningRoutes = require('./routes/earnings');



mongoose.connect('mongodb://localhost:27017/payments_app');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/payments', paymentRoutes);
app.use('/debts', debtRoutes);
app.use('/earnings', earningRoutes);



// const cache = (req,res,next) => {
//     const {id} = req.params;
//     redis.get(id,(err,result) => {
//         if(err) throw err;
//         if(result != null) return res.json(JSON.parse(result));
//         else return next();
//     })
// }

// app.get('/payments/show/:id',cache, async(req,res) =>{
//     const {id} = req.params;
//     const data = await Payments.findById(id);
//     redis.set(id,JSON.stringify(data),"ex",15);
//     return res.json(data);
// })

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong';
    else res.status(status).send(err.message);
})


app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});