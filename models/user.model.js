const mongoose = require('mongoose');
const bookSchema = require('./book.model');

const userSchema = new mongoose.Schema({
    email: { type: String },
    books: [bookSchema]
});


const userModel = mongoose.model('users', userSchema)

const seedUserData = () => {
    const newUser = new userModel({
                email: 'abufarweh34@gmail.com',
                books: [
                    {
                        name: 'math',
                        description: 'math',
                        status: '1'
                    },
                    {
                        name: 'biology',
                        description: 'biology',
                        status: '2'
                    },
                    {
                        name: 'chemistry',
                        description: 'chemistry',
                        status: '3'
                    }

                ]
            });
    console.log(newUser);
    newUser.save();
}

module.exports = {
    seedUserData,
    userModel
};