exports.today = env =>
  env === 'heroku-test' ? '2016-08-05' : 'curdate()'

exports.due_dates = start => end => compare => {
  var wrap =
    month_string(start) < month_string(end) ? x => x : x => `not(${x})`

  return wrap(`${set_2000(compare)}
    between ${set_2000(`'${start}'`)}
    and ${set_2000(`'${end}'`)}`)
}

var set_2000 = date => `date_format(${date}, '2000-%m-%d')`

var month_string = date_string => date_string.split('-')[1]

