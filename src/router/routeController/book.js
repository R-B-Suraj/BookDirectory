const Book = require('../../model/book');


const addBook = async(req, res)=>{
    const book = new Book({
        ...req.body, 
    })

    try{
        const result = await book.save();
        res.status(201).send(result);
    }catch(e){
        res.status(401).send(e);
    }
}


const getBooks = async(req,res)=>{
    try{
        const books = await Book.find({});
        res.send(books);
    }catch(error){
        res.status(400).send(error);
    }
}


const getBookById = async(req,res)=>{
    const _id = req.params.id;
    try{
        const book = await Book.findOne({_id});
        if(!book)
            return res.status(404).send('Book not found');
        
        res.send(book);
    }catch(error){
        res.status(404).send(error);
    }
}


const updateBookById = async(req, res)=>{
    try{
        const book = await Book.findOne({ _id: req.params.id});
        if(!book)
            return res.status(404).send('Book not found');
        
        const newDoc = {...book._doc,price:req.body.price};
        const updated = await Book.findByIdAndUpdate({_id:req.params.id},newDoc,{new:true});
        res.send(updated);
    }catch(error){
        res.status(401).send(error);
    }
}

const deleteBook = async(req, res)=>{
    try{
        const book = await Book.findOneAndDelete({_id: req.params.id});
        if(!book)
            return res.status(400).send();
        res.send(book);

    }catch(error){
        res.status(401).send(error);
    }
}



module.exports = {
  
    addBook,
    getBookById,
    getBooks,
    updateBookById,
    deleteBook,
    
}