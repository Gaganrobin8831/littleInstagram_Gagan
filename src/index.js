require('dotenv').config()
const express = require('express')
const connetDB = require('./DB/database')
const Userrouter = require('./routes/user.routes')
const Postrouter = require('./routes/post.routes')
const Likerouter = require('./routes/like.routes')
const Commentrouter = require('./routes/comment.routes')
const app = express()
const port = process.env.PORT

//midellware for body or json parsing
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//set routes
app.use('/',Userrouter)
app.use('/',Postrouter)
app.use('/',Likerouter)
app.use('/',Commentrouter)


// connect Db and the port
connetDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`The Server Run On Port http://localhost:${port}/`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB ERROR!!", err);
    
})

