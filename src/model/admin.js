const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
        token:{
            type: String,
        }
    }],
})



// generate token and save to admin tokens
adminSchema.methods.generateAuthToken = async function(){
    const admin = this;
    const token = jwt.sign({_id: admin._id.toString()}, 'secret string');
    admin.tokens = admin.tokens.concat({token});
    await admin.save();
    return token;
}


// verify admin
adminSchema.statics.findAdmin = async (name, password)=>{
    const admin = await Admin.findOne({name});
    if(!admin)
        throw new Error('You need admin access to change data!');

    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch)
        throw new Error('unable to login');
    
    return admin;
}


// before saving encrypt the password (used for testing to create dummy admin)
adminSchema.pre('save', async function (next){
    const admin = this;
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, 8);
    }
    next();
})



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;