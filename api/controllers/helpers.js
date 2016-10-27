exports.response_callback = res => (error, results) =>
  error ? res.badRequest({ error }) : res.json({ results })

exports.change_view = url => (req, res) =>
  res.view(url, { user: req.session.user })
