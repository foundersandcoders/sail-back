'use strict'

var jsdom = require('jsdom')
var test = require('tape')
var browserify = require('../../helpers/browserifyFile.js')

test('#Home', function (t) {
  var $, window, document

  t.test('Initialize component', function (st) {
    st.plan(3)

    var virtualConsole = jsdom.createVirtualConsole()

    virtualConsole.on('log', function (message) {
      console.log(arguments)
    })

    window = jsdom.jsdom('<html><body></body></html>', {
      virtualConsole: virtualConsole
    }).defaultView

    browserify('./assets/js/vdom/pages/Home.js', function (error, script) {
      if (error) {
        console.log('Error loading script: ', error)
        st.fail('error loading script')
      }

      jsdom.jQueryify(window, 'http://code.jquery.com/jquery-2.1.1.js', function () {
        var scriptComponent = window.document.createElement('script')
        scriptComponent.textContent = script
        window.document.head.appendChild(scriptComponent)

        document = window.document
        $ = window.$

        st.ok(window, 'window loaded')
        st.ok(document, 'document loaded')
        st.ok($, '$ loaded')
      })
    })
  })

  t.test('Component should render in home page', function (st) {
    st.plan(5)

    st.equals($('h1').text(), 'Friends of Chichester Harbour', 'right title on load')
    st.equals($('button:contains("Browse events")').text(), 'Browse events', 'see events button')
    st.equals($('button:contains("Sign in")').text(), 'Sign in', 'see Sign in button')
    st.equals($('button:contains("Sign up")').text(), 'Sign up', 'see Sign up button')
    st.equals($('button').text(), 'Sign inSign upBrowse events', 'see just three buttons')
  })

  t.test('On sign in click should render sign in page', function (st) {
    st.plan(1)

    $('button:contains("Sign in")').click()

    process.nextTick(function () {
      st.equals($('h1').text(), 'Sign in', 'moved to signin page')
    })
  })

  t.test('On sign up click should render sign up page', function (st) {
    st.plan(1)

    window.location.hash = ''

    process.nextTick(function () {
      $('button:contains("Sign up")').click()

      process.nextTick(function () {
        st.equals($('h1').text(), 'Sign up', 'moved to signup page')
      })
    })
  })

  t.test('On sign up click should render sign up page', function (st) {
    st.plan(1)

    window.location.hash = ''

    process.nextTick(function () {
      $('button:contains("Browse events")').click()

      process.nextTick(function () {
        st.equals($('h1').text(), 'Events', 'moved to signup page')
      })
    })
  })
})
