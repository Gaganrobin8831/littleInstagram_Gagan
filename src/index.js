require('dotenv').config()
const express = require('express')
const connetDB = require('./DB/database')
const router = require('./routes/app.routes')
const app = express()
const port = process.env.PORT

app.use('/',router)

connetDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`The Server Run On Port http://localhost:${port}/`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB ERROR!!", err);
    
})

