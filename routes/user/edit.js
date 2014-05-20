/**
 * New node file
 */


var mongoose = require('mongoose'),
   User = mongoose.model('User');

exports.CaptureArgs = [':name', ':id'];

exports.GET = function(req, res){
   User.find({name: req.params.name}, function(e, u){ 
      res.render('user/edit', {title: 'User', users: u});
   });
};
