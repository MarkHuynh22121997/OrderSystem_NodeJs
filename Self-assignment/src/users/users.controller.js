const userModel = require('./users.model');

exports.createUser = (req, res) => {
    userModel.createUser(req, res, (userId) => {
        if (!userId) res.status(500).send('Error');
        res.status(200).send(`User added with ID: ${userId}`);
    });
}

exports.getUsers = (req, res) => {
    userModel.getUsers(req, res, (users) => {
        if (!users) res.status(500).send('Error');
        res.status(200).send(users);
    });
}