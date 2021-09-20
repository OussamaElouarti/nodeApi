const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');
var salt = 10;
const Users = require('./Users');

router.post('/', (req, res, err) => {
    console.log(req.body);
    const {userName, email, password} = req.body;
    let errors = [];
    if (!email || !userName || !password)
        errors.push({msg: 'please fill in all fields'});
    if (password.length < 6)
        errors.push({msg: 'password should be at least 6 characters'});
    if (errors.length > 0)
    {
        res.statusCode = 401;
        res.send({errors, userName, email, password});
    }
    else{
        Users.findOne({email : email})
            .then(async(user) => {
                if (user) {
                    res.statusCode = 401;
                    errors.push({msg: 'Email is already registered'});
                    res.send({errors, userName, email, password});     
                }
                else{
                    req.body.password  = await bcrypt.hash(password, salt++)
                    const user = new Users({userName, email, password});
                    user.save()
                        .then(() => {
                            res.send('success');
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
        }
});

module.exports = router;