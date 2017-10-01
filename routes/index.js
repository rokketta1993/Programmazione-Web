var express = require('express');
var router = express.Router();
var csrf = require('csurf');


var assert = require('assert');
var passport = require('passport');
var ObjectId = require('mongodb').ObjectID;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/bank';

var csrfProtection = csrf();
router.use(csrfProtection);


//creazione collezione movimenti

var insertMoviment = function(db, callback) {
    db.collection('movimenti').insertOne( {
        "Data" : "16/06/2017",
        "Causale" : "Pagamento per cliente",
        "Valuta" : "Euro",
        "movimento_id" : "1221331",
        "Importo": "5.245"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Movimento inserito.");
        callback();
    });
};

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertMoviment(db, function() {
        db.close();
    });
});

//mostra movimento
router.get('/get-mov', function(req, res, next){
    var resultArray = [];
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('movimenti').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('bank/movimenti', {items: resultArray, title: 'Movimenti'});
        });
    });
});

var insertUsers = function(db, callback) {
    db.collection('users').insertOne( {
        "Nome" : "Mattia",
        "Cognome" : "Rocco",
        "Data_di_nascita" : "01/01/1993",
        "Comune" : "Porto San Giorgio",
        "Residenza": "Via Enrico Fermi 40",
        "Recapito": "3343456214",
        "Saldo": "2.165"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Utente inserito.");
        callback();
    });
};

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertUsers(db, function() {
        db.close();
    });
});

//mostra profilo
router.get('/get-prof', function(req, res, next){
    var resultArray = [];
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('users').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('user/profile', {items: resultArray, title:'Profilo Utente'});
        });
    });
});


























/*
router.get('/get-data', function(req, res, next){
   var resultArray = [];
    MongoClient.connect(url, function(err, db){
       assert.equal(null, err);
       var cursor = db.collection('movimenti').find();
       cursor.forEach(function(doc, err){
           assert.equal(null, err);
           resultArray.push(doc);
       }, function(){
           db.close();
           res.render('/homepage', {items: resultArray});
       });
   });
});*/


router.post('/insert', function(req, res){
    var data = req.body.Data;


    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('movimenti').insertOne(item, function(err, result){
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });

    res.redirect('/bank/movimenti');
});

/* POST to Add User Service */
/*
router.post('/insert', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var Data = req.body.Data;


    // Set our collection
    var collection = db.get('movimenti');

    // Submit to the DB
    collection.insert({
        "Data" : Data
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/bank/movimenti");
        }
    });
});*/







/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('bank/index', { title: 'Banking Project' });
});

router.get('/get-data', function (req, res, next) {
    res.render('bank/homepage', { title: 'Banking Project' });
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
    res.render('user/profile',{ title: 'Profilo Utente'});
});



router.get('/bank/movimenti', function(req, res, next) {
    res.render('bank/movimenti', { title: 'Movimenti' });
});

router.get('/bank/grafico', function (req, res, next) {
    res.render('bank/grafico', { title: 'Grafico' });
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
