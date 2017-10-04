var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var url = 'mongodb://localhost:27017/bank';
var assert = require('assert');

var User = require('../models/user');

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
    	nomemit:req.body.nomemit,
		nomedes:req.body.nomedes,
        importo:req.body.importo,
		valuta:req.body.valuta
    };
    mongo.connect(url, function(err, db){
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
    mongo.connect(url, function(err, db){
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


// Completa dati
router.get('/insert', function(req, res) {
    res.render('insert');
});
router.post('/insert', function(req,res, next){
	var item = {
		name:req.body.name,
		cognome:req.body.cognome,
		data: req.body.data,
		luogo:req.body.luogo,
		residenza: req.body.residenza,
		codice: req.body.codice,
		saldo:req.body.saldo
	};
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		db.collection('users').insertOne(item, function(err, result){
			assert.equal(null, err);
			console.log('Dati inseriti');
			db.close();
		});
	});
	res.redirect('profilo');
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



	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

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

		req.flash('success_msg', 'Ti sei registrato e puoi effettuare il LogIn');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
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
    res.redirect('/');
  });
//Profilo

//Show Profile

router.get('/profilo', function(req, res, next){
    var resultArray = [];
    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('users').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('profilo', {items: resultArray, title: 'Movimenti'});
        });
    });
});





router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'LogOut effettuato.');

	res.redirect('/users/login');
});

module.exports = router;