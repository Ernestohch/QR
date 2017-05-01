/**
 * Created by Ernesto on 28/4/2017.
 */
var mongoose = require('mongoose');
    express = require('express');
    cors = require ('cors');
    morgan = require ('morgan');
    config = require ('./config/database');
    passport = require('passport');
    routes = require ('./routes/routes');
    bodyParser = require('body-parser');


mongoose.connect(config.database);

mongoose.connection.on('open', function(){
    console.log('Mongo is Connected');
    var app = express();
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(routes);
    app.use(passport.initialize());
    require('./config/passport')(passport);

    app.listen(3333, function(){
        console.log('server is running');
    })
})