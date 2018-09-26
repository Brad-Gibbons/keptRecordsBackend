const router = require('express').Router();
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

router.get('/recordlist', authCheck, (req, res) => {
    res.render('recordlist', { user: req.user })
})
router.post('/recordlist', (req, res) => {
    // console.log(req.body, {user: req.user})
    recordController.createRecord(req.body, {user: req.user})
        .then(user => res.render('recordlist',{ record: req.body }))
        .catch(err => res.render('recordlist' ,{ user: req.user }));
})

module.exports = router;