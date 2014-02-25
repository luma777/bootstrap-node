
/*
 * GET users listing.
 */


var mongoose = require('mongoose'),
   User = mongoose.model('User');

exports.GET = function(req, res){
   User.find({}, function(e, u){ 
      res.render({title: 'User', users: u});
   });
};

exports.POST = function(req, res){
   new User({ name: req.body.name}).save();
   res.redirect('/user');
};


