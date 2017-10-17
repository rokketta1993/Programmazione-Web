var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/bank';
var assert = require('assert');
var User = require('../models/user');

var MongoClient = mongodb.MongoClient;
// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){

	res.render('login');
});

//Pagamento
router.get('/pay', function(req, res){
    res.render('pagamento');
});
//Effettua pagamenti
router.post('/pay', function(req,res, next){
    var item = {
    	ID:req.body.ID,
		tipo:req.body.tipo,
    	nomemit:req.body.nomemit,
		nomedes:req.body.nomedes,
		mese:req.body.mese,
        importo:req.body.importo,

    };

    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('pagamenti').insertOne(item, function(err, result){
            assert.equal(null, err);
            console.log('Pagamento effettuato');
            db.close();
        });
    });
    req.flash('success_msg', 'Pagamento effettuato con successo');
    res.redirect('/');
});

//Mostra pagamenti

router.get('/show', function(req, res, next){
    var resultArray = [];
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('pagamenti').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('mostrapag', {items: resultArray, title: 'Movimenti'});
        });
    });
});
router.get('/show', function(req, res){
    res.render('mostrapag');
});

// Grafico
router.get('/grafico', function(req, res){
    res.render('grafico');
});




// Registrazione Utente
router.post('/register', function(req, res){
	var name = req.body.name;
	var username = req.body.username;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Nome richiesto').notEmpty();
	req.checkBody('email', 'Email richiesta').notEmpty();
	req.checkBody('email', 'Email non valida').isEmail();
	req.checkBody('username', 'Username richiesto').notEmpty();
	req.checkBody('password', 'Password richiesta').notEmpty();
	req.checkBody('password2', 'Le password non corrispondono').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,

			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Ti sei registrato e puoi effettuare il Login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Utente sconosciuto'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Passowrd non valida'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local',
	{successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
      req.flash('success_msg', 'Login effettuato.');
    res.redirect('/');
  });

//Logout
router.get('/logout', function(req, res){
	req.logout();

    req.flash('success_msg', 'Logout effettuato con successo');
	res.redirect('/users/login');
});

module.exports = router;