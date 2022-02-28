const Admin = require('../../model/admin');


const adminLogin = async(req, res)=>{
    try{
        const admin = await Admin.findAdmin(req.body.name, req.body.password);
        const token = await admin.generateAuthToken();
        res.send({admin,token});
    }catch(error){
       // console.log(error);
        res.status(400).send('Error : incorrect login information');
    }
}


const logout = async (req, res)=>{
    try{
        req.admin.tokens = req.admin.tokens.filter((tokenObj)=>{
            return tokenObj.token !== req.token;
        });
        await req.admin.save();
        res.send('logged out successfully');
    }catch(error){
        res.status(404).send(error);
    }
}

module.exports = {
    adminLogin,
    logout
}