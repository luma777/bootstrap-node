
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , response = http.ServerResponse.prototype
  , _render = response.render
  , path = require('path')
  , verbose = false;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// bootstrap schema
require('./schema')('mongodb://localhost/node');

// bootstrap routes
require('./boot')(app, '/routes', {verbose:verbose}, response, _render);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
