/**
 * New node file
 */


var mongoose = require('mongoose'),
   User = mongoose.model('User');

exports.CaptureArgs = [':name'];

exports.GET = function(req, res){
   User.find({name: req.params.name}, function(e, u){ 
      res.render({title: 'User', users: u});
   });
};
