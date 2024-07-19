const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



// define routes
const userRoutes = require('./route/UserRoute');
const productRoutes = require('./route/ProductRoute');

// connect to db
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();({
        path: './.env'
    });
}

const port = process.env.PORT;
const dbconnection = "mongodb+srv://admin:admin@ecommerce.h1vq9gz.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce";
// const dbconnection = process.env.MONGOURL;
const app = express(); 
app.use(cors());
app.use(express.json());


app.listen(port, (req,res)=>{
    console.log(`Server is runnning on port ${port}`);
    console.log(`Database url is: ${dbconnection}`)
})
app.get('/',(req,res)=>{
    res.send('Server is online');
})

// connect to db
mongoose.connect(dbconnection, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('Connected to Mongodb'))
.catch(err => console.log('connection failed',err));

// create api routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);