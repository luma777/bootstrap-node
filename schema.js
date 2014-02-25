/**
 * New node file
 */

var mongoose = require('mongoose'),
   fs = require('fs');

//Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
});

var connect = function(strConn) {
   var options = { server: { socketOptions: { keepAlive: 1 } } };
   mongoose.connect(strConn, options); 
};

module.exports = function(strConn) {
   connect(strConn);

   // Bootstrap models
   var models_path = __dirname + '/schema';
   fs.readdirSync(models_path).forEach(function (file) {
     if (~file.indexOf('.js')) require(models_path + '/' + file);
   });
}


