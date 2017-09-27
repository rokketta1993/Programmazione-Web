var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var passport = require('passport');

var MongoClient = require('mongodb').MongoClient;



var url = 'mongodb://localhost:27017/mattia';

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */

router.get('/get-data', function(req, res, next){
   var resultArray = [];
    mongo.connect(url, function(err, db){
       assert.equal(null, err);
       var cursor = db.collection('users').find();
       cursor.forEach(function(doc, err){
           assert.equal(null, err);
           resultArray.push(doc);
       }, function(){
           db.close();
           res.render('/', {items: resultArray});
       });
   });
});

var port = process.env.PORT || 4000;

/*
router.post('/insert', function(req, res, next){
    var item = {
        email: req.body.email,
        password: req.body.password,
        saldo: req.body.saldo

    };

    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('users').insertOne(item, function(err, result){
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });

    res.redirect('/get-data');
});*/








router.get('/', function (req, res, next) {
  res.render('bank/index', { title: 'Banking Project' });
});

router.get('/user/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.get('/bank/homepage', function (req, res, next) {
    res.render('bank/homepage', { title: 'Homepage' });
});

router.post('/user/signup', passport.authenticate('local.signup',{



    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));


router.get('/user/profile', function(req, res, next){
    res.render('user/profile');
});

// GET /logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});


module.exports = router;
