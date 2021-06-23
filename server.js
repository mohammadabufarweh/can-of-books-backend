// frameworks are code that executes or runs your own code
// libraries are code that gets executed by your own code

const express = require('express') // require the express package
const app = express() // initialize your express app instance
const mongoose = require('mongoose');
const {
    getBooks,
    createBooks,
    updateBooks,
    deleteBooks
} = require('./controllers/book.controller');

require('dotenv').config();
const PORT = process.env.PORT;
const {seedUserData} = require('./models/user.model')
const cors = require('cors'); // enable the communication between the frontend and the backend
app.use(cors())

// this method is used to decode our request body sent by the post or put methods
app.use(express.json());


// connect to mongo db using mongoose
mongoose.connect('mongodb://localhost:27017/myFavoriteBooks',
    { useNewUrlParser: true, useUnifiedTopology: true }
);


//we seed/ populating or filling our database with starter data
// the seed function is responsible for populating our database with data
// invoke/ call once

// seedUserData();

/*
-------------------------------
Our routes
-------------------------------
*/


app.get('/books', getBooks)
app.post('/books', createBooks)
app.put('/books/books_idx', updateBooks)
app.delete('/books/books_idx', deleteBooks)


app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello World') // our endpoint function response
    })
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

