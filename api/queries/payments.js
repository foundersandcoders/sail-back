exports.paying_in =
  `select p.*, m.last_name from payments p, members m
    where exists (
      select 1 from payments p2
        where p2.reference = ?
          AND p2.member = p.member
          AND p2.date >= p.date
    )
    AND p.member = m.id
    AND m.test = false
    order by
      case
        when p.reference = ? then 0
        else 1
      end desc, p.date
    , field(p.category, 'donation', 'event', 'subscription', 'payment');`

exports.non_cheque =
  `select p.*, m.last_name from payments p, members m
     where exists (
       select 1 from payments p2
         where p2.date >= ? AND p2.date <= ?
           AND p2.type = ?
           AND p2.member = p.member
           AND p2.date >= p.date
     )
     AND p.member = m.id
     AND m.test = false
     order by p.date
     , field(p.category, 'donation', 'event', 'subscription', 'payment');`

