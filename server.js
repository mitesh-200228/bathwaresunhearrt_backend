const express = require('express')
const app = express()
const db = require('./db')
app.use(express.json())
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
var corsOptions = ['http://localhost:3000', 'https://bathwaresunhearrt.com/'];
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/api', cors(corsOptions), userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))

    app.get('*', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client/build/index.html'))

    })
}

const port = process.env.PORT
app.listen(port, (req, res) => {
    console.log(`Node JS Server Started on ${port}`)
});
app.get('/',(req,res)=>{
    return res.send({message:'Listening successfully'});
})
