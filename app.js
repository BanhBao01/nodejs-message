const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const app = express();

// Passport session setup. 
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Sử dụng FacebookStrategy cùng Passport.
passport.use(new FacebookStrategy({
        clientID: "198435921276613",
        clientSecret: "57865977c4b251119479b82e0a4efd5e",
        callbackURL: "https://localhost:3001/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            console.log(accessToken, refreshToken, profile, done);
            return done(null, profile);
        });
    }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // sử dụng view ejs
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body để get data
app.use(session({ secret: 'keyboard cat', key: 'sid' })); //Save user login
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(3001);