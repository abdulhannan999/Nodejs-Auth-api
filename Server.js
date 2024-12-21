const express = require('express');
const app = express();
const cors = require('cors');
const { DbConnection } = require('./utils/dbConnect');
const route = require('./routes/UserRoutes');
require('dotenv').config()
// Mongo DB Connectionsa

// Middleware Connections
app.use(cors())
app.use(express.json())

DbConnection()
// Routes
app.use("/auth", route )

// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('App running in port: '+PORT)
})