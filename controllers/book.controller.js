'use strict';
const {userModel} = require('../models/user.model');

const getBooks = (req,res) => {
    const { email } = req.query;
    console.log(email);
    userModel.find({ email: email }, (error, user) => {
        if (error) {
            res.send(error)
        } else {
            res.json(user)
        }
    });

} 

const createBooks = (request, response) => {
    

    console.log(request.body)
    const { userEmail, bookName, bookDescription, bookStatus } = request.body;

    userModel.findOne({ email: userEmail }, (error, userData) => {
        if (error) {
            response.send(error)
        } else {
            
            userData.books.push({ name: bookName, description: bookDescription, status: bookStatus});
            userData.save();
            response.json(userData);
        }
    })
}

const updateBooks = (request, response) => {
    console.log(request.params)
    const bookIndex = request.params.books_idx;
    console.log(bookIndex)
    const { userEmail, bookName, bookDescription, bookStatus} = request.body;
    userModel.findOne({ email: userEmail }, (error, userData) => {
        if (error) {
            response.send(error)
        } else {
            userData.books.splice(bookIndex, 1, { name: bookName, description:bookDescription, status: bookStatus });
            userData.save();
            response.send(userData)
        }

    });
}

const deleteBooks = (request, response) => {
    console.log(request.params)
    const bookIndex = request.params.books_idx;
    const { email } = request.query;

    userModel.findOne({ email: email }, (error, userData) => {
        if (error) {
            response.send(error)
        } else {
            userData.books.splice(bookIndex, 1);
            userData.save();
            response.send(userData)
        }

    });
}

module.exports = {
    getBooks,
    createBooks,
    updateBooks,
    deleteBooks
};