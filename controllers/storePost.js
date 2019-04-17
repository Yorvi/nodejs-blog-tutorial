let path = require('path');
let Post = require('../database/models/Post');

module.exports = (req, res) => {
  let { image } = req.files

  image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
    Post.create({
      ...req.body, 
      image: `/posts/${image.name}`
    }, (error, post) => {
      res.redirect('/');
    });
  })
}