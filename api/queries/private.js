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

const postColumns = 'address1, address2, address3, address4, county, postcode'

const emailColumns = 'members.primary_email'

exports.newsletter =
  `select members.primary_email, members.secondary_email,
  members.first_name, members.last_name, members.title
    from members
    where members.news_type = 'online';`

exports.subscriptions = subsQueryTemplate(emailColumns, 'online')

exports.newsletter_labels =
  `select title, first_name, last_name, address1, address2, address3, address4,
  postcode, county from members
    where members.news_type = 'post'
      or members.email_bounced = true;`

exports.newstype_post =
  `select title, first_name, last_name, address1, address2,
  address3, address4, postcode, county
    from members
    where news_type = 'post';`

exports.newstype_post_nonzero = subsQueryTemplate(postColumns, 'post')
