var express             = require('express');
var app                 = express();
var http                = require('http').Server(app);
var expressValidator    = require('express-validator');
const bodyParser        = require('body-parser');


require('dotenv').config();

app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({ extended: false,
    parameterLimit: 1000000,
 limit: '50mb'}));

var category 	= require('./models/category');

app.use(expressValidator({
  customValidators: {
    isName: function(value) {
        return new Promise((resolve, reject) => {
            return category.index().where('name', value).fetch().then(function(cat) {
               if(cat !== null) {
                  return reject(cat.get('name'));
               } else {
                  return resolve(true);
               }
            });
        });
        //return true;
    
    }
  }
}));
app.use(function(req, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
     response.setHeader("Access-Control-Allow-Credentials", "true");
     response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
     response.setHeader("Access-Control-Allow-Headers", "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type");
   return next();
 });

app.use(require('./routes/index'));

var db 	= require('./config/db');
global.bookshelf = db.connection();

http.listen(process.env.PORT, function(req, res){
    console.log('server  create');
});