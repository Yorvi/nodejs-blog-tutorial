let bcrypt = require('bcrypt');
let User = require('../database/models/User');

module.exports = (req, res) => {
  let { email, password } = req.body;

  // try to find the User
  User.findOne({
    email
  }, (error, user) => {
    if (user) {
      // compare passwords
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          // store user session
          req.session.userId = user._id
          res.redirect('/')
        } else {
          res.redirect('/auth/login')
        }
      })
    } else {
      return res.redirect('/auth/login')
    }
  })
}