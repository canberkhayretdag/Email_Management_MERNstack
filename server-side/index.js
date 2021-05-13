const express = require('express')
const app = express()
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var cors = require('cors')

mongoose.set('useFindAndModify', false);
require("dotenv").config();
app.use(cookieParser())


app.use(cors({ origin: true, credentials: true }));
const port = 3030



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }, () => 
            console.log("Connected to db")
        );
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
}



connectDB();

// middleware
app.use(express.json());


const auth__router = require('./routes/auth')
const user__router = require('./routes/user')
const list__router = require('./routes/list')
const mail__router = require('./routes/mail')
const template__router = require('./routes/template')

app.use('/api/auth', auth__router)
app.use('/api/user', user__router)
app.use('/api/list', list__router)
app.use('/api/mail', mail__router)
app.use('/api/template', template__router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

