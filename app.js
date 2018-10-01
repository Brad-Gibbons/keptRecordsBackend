const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const methodOverride = require('method-override')
const app = express();
app.use(methodOverride('_method'))
//View engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//init passport
app.use(passport.initialize());
app.use(passport.session());

//mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongo db')
})

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes)
//index
app.get('/', function(req, res) {
    res.render('home', {user: req.user})
})


app.listen(8080, () => {
    console.log('On port 8080')
});

