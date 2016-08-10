var date = require('./date_helpers.js').today(process.env.NODE_ENV)
var due_date = require('./date_helpers.js').due_dates

const subsQueryTemplate = (columns, news_type) => (
  `select first_name, last_name, title, ${columns},
  datediff(${date}, max(payments.date)) as overdue,
  members.standing_order, members.due_date, members.id,
  sum(case payments.category
    when 'payment' then -payments.amount
    else                 payments.amount
    end) as amount
    from members right outer join payments
    on members.id = payments.member
    where members.primary_email is${news_type === 'online' ? ' not' : ''} null
    and members.membership_type in
    ('annual-single', 'annual-double', 'annual-family')
    and activation_status='activated'
    group by members.id
    having sum(case payments.category
      when 'payment' then -payments.amount
      else                 payments.amount
      end) > 0
      and datediff(${date}, max(payments.date)) > 30;`
)

const newsletterQueryTemplate = (columns, news_type) => (
  `select first_name, last_name, title, ${columns}
  from members
  where news_type = '${news_type}'
  and activation_status='activated';`
)

exports.update_subscription = body =>
  `insert into payments (member, category, amount, date, createdAt)
  select id, 'subscription', amount, ${date}, now() from members, membershiptypes
  where members.membership_type = membershiptypes.value
  and news_type = '${body.news_type}'
  and members.membership_type in
  ('annual-single', 'annual-double', 'annual-family', 'annual-corporate', 'annual-group')
  and ${due_date(body.start)(body.end)('members.due_date')}
  and activation_status='activated';`

exports.subscription_due_template = body =>
  `select first_name, last_name, title, address1, address2, address3, address4,
  county, postcode, id, due_date, membership_type, primary_email, secondary_email, amount
  from members, membershiptypes
  where members.membership_type = membershiptypes.value
  and news_type = '${body.news_type}'
  and standing_order in (null, false)
  and members.membership_type in
  ('annual-single', 'annual-double', 'annual-family', 'annual-corporate', 'annual-group')
  and ${due_date(body.start)(body.end)('members.due_date')}
  and activation_status='activated';`



const post_columns = 'address1, address2, address3, address4, county, postcode'

const online_columns = 'primary_email, secondary_email'


exports.newsletter = newsletterQueryTemplate(online_columns, 'online')

exports.newstype_post = newsletterQueryTemplate(post_columns, 'post')

exports.subscriptions = subsQueryTemplate(online_columns, 'online')

exports.newstype_post_nonzero = subsQueryTemplate(post_columns, 'post')

exports.custom_email =
  `select first_name, last_name, title, primary_email, secondary_email
  from members
  where primary_email is not null
  and activation_status='activated';`

exports.newsletter_labels =
  `select title, first_name, last_name, initials,
  address1, address2, address3, address4,
  postcode, deliverer from members
  where members.news_type = 'post'
  or members.email_bounced = true
  and activation_status='activated';`
