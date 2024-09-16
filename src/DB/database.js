const mongoose = require('mongoose')

const connetDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log(`\nMONGO DB CONNECTED !! DB HOST  ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("ERROR",error);
        process.exit(1);        
    }
}

module.exports = connetDB