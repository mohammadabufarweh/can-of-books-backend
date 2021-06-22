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


module.exports = {
    getBooks,
    createBooks,
};