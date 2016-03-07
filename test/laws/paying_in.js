import jsv from 'jsverify'
import test from 'tape'

import { prepare } from '../../src/admin/redux/modules/paying_in.js'

const fixed_sum = (options) =>
  jsv.bless({ generator: () => options[(jsv.random(0, options.length - 1))] })

const with_default = arb => fallback =>
  arb.smap(x => jsv.random(0, 1) === 0 ? x : fallback, x => x)

const member = with_default(jsv.nat)(55)

const category = fixed_sum(['payment', 'donation', 'event', 'subscription'])

const reference = with_default(jsv.nat)(12313)

const last_name = fixed_sum(['Jacks', 'Wills', 'Harrys', 'Letitias'])

const charge = jsv.record(
  { member
  , last_name
  , category
  , reference
  , amount: jsv.nat
  , date: jsv.datetime
  }
)

const balances_match = jsv.forall(jsv.array(charge), function (charges) {
  return prepare(12313)(charges).payments.every((
    { payment = 0
    , payments = 0
    , donation = 0
    , event = 0
    , subscription = 0
    , balance = 0
    }
  ) =>
    payment + payments - donation - event - subscription === balance
  )
})

module.exports = test('Balances always check out', t => {
  const actual = jsv.check(balances_match)
  t.strictEqual(true, actual, 'balances all matched')
  t.end()
})
