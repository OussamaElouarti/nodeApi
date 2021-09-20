const express = require('express');
const { result } = require('lodash');
const router = express.Router();
const Users = require('./Users');
const Notes = require('./notes');
router.post('/', (req, res, err) => {
    const { id, text, time, reminder } = req.body.notes;
    var flag = 0;
    Users.findOne({ _id: req.body._id })
    .then((user) => {
        for (var i = 0; i < user.notes.length; i++)
        {
                if (user.notes[i].text == req.body.notes.text)
                {
                    flag++;
                    res.send('task already exists: same text');
                }
                if (user.notes[i].id == req.body.notes.id)
                {
                    flag++;
                    res.send('task already exists: same id');
                }
            }
            if (flag == 0)
            {
                user.notes.push({id, text, time, reminder});
                    user.save()
                    .then((result) => {
                        res.send(result);
                    })
            }
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;