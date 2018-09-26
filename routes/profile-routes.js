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
router.post('/recordlist', authCheck, (req, res) => {
    recordController.createRecord(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
})

module.exports = router;