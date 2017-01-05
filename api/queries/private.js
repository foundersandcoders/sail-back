var d = require('./date_helpers.js')
var date = d.today(process.env.NODE_ENV)
var set_current = d.set_current(process.env.NODE_ENV)

const columns = `first_name, last_name, title, address1, address2,
  address3, address4, county, postcode, primary_email, secondary_email`

exports.subsReminderQuery = news_type => (
  `select ${columns},
  datediff(${date}, max(payments.date)) as overdue,
  members.standing_order, members.due_date, members.id,
  sum(case payments.category
    when 'payment' then -payments.amount
    else                 payments.amount
    end) as amount
    from members right outer join payments
    on members.id = payments.member
    where activation_status='activated'
    and ${news_type === 'online'
        ? 'primary_email is not null and email_bounced != true'
        : '(primary_email is null or email_bounced = true)'}
    and members.membership_type in
    ('annual-single', 'annual-double', 'annual-family', 'annual-corporate', 'annual-group')
    group by members.id
    having sum(case payments.category
      when 'payment' then -payments.amount
      else                 payments.amount
      end) > 0
      and datediff(${date}, max(payments.date)) > 30;`
)

exports.newsletter_reminder = () => (
  `select ${columns}
  from members
  where news_type = 'online'
  and primary_email is not null
  and email_bounced != true
  and activation_status='activated'
  and membership_type != 'accounts';`
)

exports.update_subscription = body =>
  `insert into payments (member, category, description, amount, date, createdAt)
  select id, 'subscription', 'Subscription', amount, ${set_current('due_date')}, now()
  from members, membershiptypes
  where members.membership_type = membershiptypes.value
  and members.membership_type in
  ('annual-single', 'annual-double', 'annual-family', 'annual-corporate', 'annual-group')
  and ${body.news_type === 'online'
      ? 'primary_email is not null and email_bounced != true'
      : '(primary_email is null or email_bounced = true)'}
  and
    date_sub(${date}, interval 11 month)
    > (ifnull((select max(date) from payments
      where members.id = payments.member
      and payments.category = 'subscription'), '1970-01-01')
    )
  and ${d.due_dates(body.start)(body.end)('members.due_date')}
  and activation_status='activated';`

exports.subscription_due_template = body =>
  `select ${columns}, id, due_date, membership_type, amount
  from members, membershiptypes
  where members.membership_type = membershiptypes.value
  and (standing_order is null or standing_order=false)
  and members.membership_type in
  ('annual-single', 'annual-double', 'annual-family', 'annual-corporate', 'annual-group')
  and ${body.news_type === 'online'
      ? 'primary_email is not null and email_bounced != true'
      : '(primary_email is null or email_bounced = true)'}
  and
    date_sub(${date}, interval 11 month)
    > (ifnull((select max(date) from payments
      where members.id = payments.member
      and payments.category = 'subscription'), '1970-01-01')
    )
  and ${d.due_dates(body.start)(body.end)('members.due_date')}
  and activation_status='activated';`

exports.custom_email = () =>
  `select first_name, last_name, title, primary_email, secondary_email
  from members
  where primary_email is not null
  and email_bounced != true
  and activation_status='activated'
  and membership_type != 'accounts';`

exports.newsletter_labels = () =>
  `select title, first_name, last_name, initials,
  address1, address2, address3, address4,
  postcode, deliverer from members
  where (members.news_type = 'post'
  or members.email_bounced = true)
  and activation_status='activated'
  and membership_type != 'accounts';`

exports.reset_subscription_payments =
  `delete from payments
  where createdAt >= date_sub(curdate(), interval 2 day)
  and category='subscription';`

exports.list_deliverers = () =>
  `select deliverer from members
    group by deliverer;`
