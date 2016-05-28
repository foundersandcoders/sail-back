exports.newsletter =
  `select members.primary_email, members.secondary_email,
  members.first_name, members.last_name, members.title
    from members
    where members.news_type = 'online';`

exports.subscriptions =
  `select members.primary_email, members.first_name, members.last_name,
  members.title, datediff(curdate(), max(payments.date)) as overdue,
  members.standing_order, members.due_date
    from members right outer join payments
    on members.id = payments.member
    where members.news_type = 'online'
      and members.membership_type in
        ('annual-single', 'annual-double', 'annual-family')
    group by members.id
    having sum(case payments.category
              when 'payment' then -payments.amount
              else                 payments.amount
              end) > 0
      and datediff(curdate(), max(payments.date)) > 30;`

exports.newsletter_labels =
  `select title, first_name, last_name, address1, address2, address3, address4,
  postcode, county from members
    where members.news_type = 'post'
      or members.email_bounced = true;`

