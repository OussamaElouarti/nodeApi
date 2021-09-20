const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');
const Users = require('./Users');


router.post('/', (req, res, err) => {
    Users.findOne({email: req.body.email})
        .then((result) => {
            bcrypt.compare(req.body.password, result.password, (err, isMatch) => {
                if (err)
                    console.log(err);
                else if (isMatch){
                    res.send(result);
                }
                else
                {
                    res.statusCode = 401;
                    res.send('password incorrect!');
                }
            })
        })
        .catch((err) => {
            res.statusCode = 401;
            res.send('User doesnt exist!');
    });
});

module.exports = router;