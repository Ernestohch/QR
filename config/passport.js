/**
 * Created by Ernesto on 29/4/2017.
 */
var JwStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt
var User = require('../model/user');
var config = require ('../config/database');

module.exports = function (passport) {
    var opts ={};
    opts.secret0rkey = config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = 'secret';
    passport.use(new JwStrategy(opts, function (jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function (err, user) {
            if (err){
                return done(err, false);
            }
            if (user){
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));
}