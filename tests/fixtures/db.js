
const mongoose = require('mongoose');
const Admin = require('../../src/model/admin');
const Book = require('../../src/model/book');
const jwt = require('jsonwebtoken');

const adminOneId = new mongoose.Types.ObjectId();
const adminOne = {
    _id: adminOneId,
    name:"ADMIN_1",
    password:"admin@1",
    tokens:[
        {token: jwt.sign({_id: adminOneId.toString()}, 'secret string') }
    ]
}
// this token is used for authenticated routes so that we don't have to signin everytime for testing


const bookOne = {
    _id: new mongoose.Types.ObjectId(),
    title:"Atomic habits",
    price:100
}

const bookTwo = {
    _id: new mongoose.Types.ObjectId(),
    title:"How to talk to anyone",
    price:200
}

const bookThree = {
    _id: new mongoose.Types.ObjectId(),
    title:"The magic of thinking Big",
    price:250
}

const setupDatabase = async ()=>{
    await Admin.deleteMany();
    await Book.deleteMany();
    await new Admin(adminOne).save();
    await new Book(bookOne).save();
    await new Book(bookTwo).save();
    
}


module.exports = {
    bookOne, bookTwo, bookThree, adminOne, setupDatabase
}