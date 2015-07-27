'use strict';

var toHTML       = require('vdom-to-html');
var cheerio      = require('cheerio');

module.exports = renderHTML;

function renderHTML (stateFun, renderFun) {

	function htmlFunction (obj) {

		var state = stateFun(obj);
		var html  = toHTML(renderFun(state));
		return cheerio.load(html)
	}

	return htmlFunction;
}