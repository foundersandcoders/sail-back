exports.sql_response = res => (error, results) =>
  error ? res.badRequest({ error}) : res.json({ results })
