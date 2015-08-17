module.exports = {
  test: function (req, res) {
    res.view('pages/test', {user: req.session.user})
  }
}
