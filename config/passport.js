var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcryptjs');


passport.serializeUser(function (user, done) {

    console.log("serializeUser", arguments);

    done(null, user[0].id);
});
passport.deserializeUser(function (id, done) {

    console.log("deserializeUser", arguments);

    Members
    .findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy(function (username, password, done){

    console.log("use", arguments);

    Members
    .findOne({primary_email: username})
    .exec(function (err, user){
        if(err || !user) {
            return done(null, err); 
        };
        if (!user || user.length < 1) {
            return done(null, false, { message: 'Incorrect User'}); 
        };
        bcrypt.compare(password, user.password, function (err, res) {
            if(!res){
                return done(null, false, { message: 'Invalid Password'});
            }else{
                return done(null, user);
            };
        });
    })
}));