module.exports = {
   ensureAuthenticated: function (req, res, next) {
      if (req.ensureAuthenticated) {
         return next;
      }
      req.flash('error_msg', 'Not Authorized ..Please Login First')
      res.redirect('/')

   }
}