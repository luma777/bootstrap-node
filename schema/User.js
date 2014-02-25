

var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

var UserSchema = new Schema({
   id: Schema.ObjectId,
   name: {type: String, index: true}
});

mongoose.model('User', UserSchema);
