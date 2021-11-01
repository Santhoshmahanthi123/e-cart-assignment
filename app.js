const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/e-cart';
mongoose.connect(
    mongoDB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const orderRoutes = require('./routes/orders');
app.use("/",orderRoutes);
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})