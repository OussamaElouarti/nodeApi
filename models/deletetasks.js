const express = require('express');
const { result } = require('lodash');
const router = express.Router();
const Users = require('./Users');

router.post('/', (req, res, err) => {
    Users.findOne({ id: req.body.id })
        .then((user) => {
            user.notes.push({ id, text, time, reminder });
            user.save()
                .then((result) => {
                    res.send(result);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;