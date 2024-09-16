const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        }

    }, {
    timestamps: true
}
)

const User = new mongoose.model('User', UserSchema)

module.exports = User