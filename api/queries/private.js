const subsQueryTemplate = (columns, newsType) => (
  `select first_name, last_name, title, ${columns},
  datediff(curdate(), max(payments.date)) as overdue,
  members.standing_order, members.due_date, members.id,
  sum(case payments.category
    when 'payment' then -payments.amount
    else                 payments.amount
    end) as amount
    from members right outer join payments
    on members.id = payments.member
    where members.news_type = '${newsType}'
    and members.membership_type in
    ('annual-single', 'annual-double', 'annual-family')
    group by members.id
    having sum(case payments.category
      when 'payment' then -payments.amount
      else                 payments.amount
      end) > 0
      and datediff(curdate(), max(payments.date)) > 30;`
)

const newsletterQueryTemplate = (columns, newsType) => (
  `select first_name, last_name, title, ${columns}
  from members
  where news_type = '${newsType}';`
)

//TODO add dynamic dates
const subscription_due_template = (columns, news_type) =>
  `select title, first_name, last_name, initials,
  ${columns}, due_date, membership_type,
  membershiptypes.amount from members
    join membershiptypes on members.membership_type = membershiptypes.value
      where due_date >= '2016-01-01'
      and due_date <= '2017-12-12'
      and news_type = ${news_type}
      and standing_order is null
      and members.membership_type in
        ('annual-single', 'annual-double', 'annual-family', 'annual-corporate', 'annual-group');`


const post_columns = 'address1, address2, address3, address4, county, postcode'

const online_columns = 'primary_email, secondary_email'


exports.newsletter = newsletterQueryTemplate(online_columns, 'online')

exports.subscriptions = subsQueryTemplate(online_columns, 'online')

exports.newstype_post = newsletterQueryTemplate(post_columns, 'post')

exports.newstype_post_nonzero = subsQueryTemplate(post_columns, 'post')

exports.subscription_due_post = subscription_due_template(post_columns, `'post'`)

exports.subscription_due_online = subscription_due_template(online_columns, `'online'`)

exports.newsletter_labels =
  `select title, first_name, last_name, initials,
  address1, address2, address3, address4,
  postcode, county from members
  where members.news_type = 'post'
  or members.email_bounced = true;`
