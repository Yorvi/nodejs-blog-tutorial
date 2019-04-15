let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String
});

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;