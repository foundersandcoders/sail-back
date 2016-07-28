update
  members,
  (select
    date_add(max(payments.date), interval 1 year) as date,
    member from payments
    where payments.category='subscription'
    group by payments.member
  ) as payments
  set members.due_date=payments.date
  where members.id=payments.member
  and members.membership_type in
  ('annual-single', 'annual-double', 'annual-family', 'annual-corporate', 'annual-group');
