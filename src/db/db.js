// connect to mongoDB database

const mongoose = require('mongoose');

let url = 'mongodb+srv://adminSuraj:adminSuraj@cluster0.mgxco.mongodb.net/BOOK_DIRECTORY?retryWrites=true&w=majority';


mongoose.connect(url,{useNewUrlParser:true}).then(console.log('connected to database')).catch(e=>console.log(e));
