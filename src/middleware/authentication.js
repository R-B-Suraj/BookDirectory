const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

const authenticate = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const payload = jwt.verify(token, 'secret string');
        const admin = await Admin.findOne({_id: payload._id, 'tokens.token': token});
        
        if(!admin)
            throw new Error('You should have admin access');

        req.token = token;
        req.admin = admin;
        next();

    }catch(error){
        res.status(401).send('error: You do not have admin access');
    }
}


module.exports = authenticate;