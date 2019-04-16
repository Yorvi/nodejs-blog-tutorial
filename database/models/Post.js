let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  username: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;