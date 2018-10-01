const router = require('express').Router();
const Record = require('../models/recordModel');


const recordController = require('../config/recordController');
var bodyParser = require('body-parser')
const authCheck = (req,res,next) => {
    if(!req.user) {
        //if user is not logged in
        res.redirect('/');
    } else {
        next();
    }
}
router.use(bodyParser.urlencoded({extended : true}));
router.get('/', authCheck, (req, res) => {
    // res.send(req.user)
    res.render('profile', { user: req.user })
})

router.get('/recordlist/:id', authCheck, (req, res) => {
    // res.render('recordlist', { user: req.user })

    recordController.findAllRecords({}, req.params.id)
    .then(data => res.render('recordlist', {data: data}))
    .catch(err => res.json(err))
})
router.post('/recordlist', (req, res) => {
    // console.log(req.body, {user: req.user})
    recordController.createRecord(req.body, {user: req.user})
        .then(user => res.redirect('/profile/recordlist'))
        .catch(err => res.render('recordlist' ,{ user: req.user }));
})


router.delete('/recordlist/:id', (req, res) => {

    Record.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err)
        } else {
            res.redirect('/profile/recordlist/')
        }
    })




    // console.log(req.params);
    // recordController.deleteRecord(req.params)
    //     .then(() => {
    //         res.redirect('/profile/recordlist')
    //     })
    //     .catch(err => {
    //         // res.render('recordlist' ,{ user: req.user })
    //     })
})
module.exports = router;