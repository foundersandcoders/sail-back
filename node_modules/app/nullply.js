module.exports = function (fn) { return Function.apply.bind(fn, null) }
