exports.today = env =>
  env === 'heroku-test' ? "'2016-08-15'" : "curdate()"

exports.due_dates = start => end => compare => {
  var wrap =
    month_and_day(start) < month_and_day(end) ? x => x : x => `not(${x})`

  return wrap(`${set_2000(compare)}
    between ${set_2000(`'${start}'`)}
    and ${set_2000(`'${end}'`)}`)
}

var set_2000 = date => `date_format(${date}, '2000-%m-%d')`

var month_and_day = date_string => date_string.split('-').slice(1).join()

