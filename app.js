var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');



var mongo = require('mongodb');
var LocalStrategy = require('passport-local').Strategy;

//uri: mongodb://mattia9319:ciaociao1@ds119345.mlab.com:19345/bank

mongoose.connect('mongodb://mattiarocco9319:ciaociao1@ds119345.mlab.com:19345/bank', { useMongoClient: true });
var db = mongoose.connection;
mongoose.Promise = global.Promise;
var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



// Connessione Flash
app.use(flash());

// Variabili globali
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//*******

// Funzione per realizzare il Grafico


//importazione mongodb package
var mongodb = require("mongodb");


var dbHost = "mongodb://mattiarocco9319:ciaociao1@ds119345.mlab.com:19345/bank";

//DB Object
var dbObject;

//Instanza di mongoDB per stabilire connessione
var MongoClient = mongodb.MongoClient;

//Connessione al database sulla porta 27017 di default

MongoClient.connect(dbHost, function(err, db){
    if ( err ) throw err;
    dbObject = db;
});

function getData(responseObj){
    //use the find() API and pass an empty query object to retrieve all records
    dbObject.collection("pagamenti").find({}).toArray(function(err, docs){
        if ( err ) throw err;
        var meseArray = [];
        var importoPrices = [];


        for ( index in docs){
            var doc = docs[index];
            //category array
            var mese = doc['mese'];
            //series 1 values array
            var importo = doc['importo'];

            meseArray.push({"label": mese});
            importoPrices.push({"value" : importo});

        }

        var dataset = [
            {
                "seriesname" : "Saldo",
                "data" : importoPrices
            }
        ];

        var response = {
            "dataset" : dataset,
            "categories" : meseArray
        };
        responseObj.json(response);
    });
}


//Difinizione middleware per operare su file statici
app.use('/public', express.static('public'));
app.get("/fuelPrices", function(req, res){
    getData(res);
});
app.get("/grafico", function(req, res){
    res.render("grafico");
});


//*********************************************************************************

app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server attivo su: http://localhost:'+app.get('port'));
});