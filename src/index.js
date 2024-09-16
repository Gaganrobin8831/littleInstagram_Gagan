require('dotenv').config()
const express = require('express')
const connetDB = require('./DB/database')
const app = express()
const port = process.env.PORT



connetDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`The Server Run On Port http://localhost:${port}/`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB ERROR!!", err);
    
})

