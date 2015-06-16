"use strict";


var nuclear = module.exports = {
	app:           app,
	router:        router,
	diff:          require('virtual-dom/diff'),
	patch:         require('virtual-dom/patch'),
	createElement: require('virtual-dom/create-element'),
	h:             require('virtual-dom/h'),
	observ:        require('observ'),
	observS:       require('observ-struct'),
	observA:       require('observ-array'),
	observV:       require('observ-varhash'),
	request:       require('xhr')
};


function router (state) {

	// browsers only
	if (!window) return;

	var loc     = window.location;
	var win     = window;
	var started = false;

	function hash () {
		return loc.href.split('#')[1] || '';
	}

	function parser (path) {
		return path.split('/');
	}


	window.addEventListener("hashchange", function () {

		state.route.set(hash());
	});

	function route (path, handler) {
	
		if (parser(path)[1] === "*") {
			return handler(state);
		}

		if(hash() === parser(path)[1]) {
			return handler(state);
		}
	}
	
	return route;
}


function app (elem, observ, render) {


    if (!elem) {
        throw new Error('Element does not exist. Nuclear cannot be initialized.');
    }

	var target = start(render, observ);
	elem.appendChild(target.dom);
	
	return observ(target.update);
}


function start (render, observ) {
	var virtualTree;
	var resultsNode;
	var target = {};

	virtualTree = render(observ);
	resultsNode = nuclear.createElement(virtualTree);
	target.dom  = resultsNode;
	target.update = function () {

		var newResults = render(observ);
		var patches    = nuclear.diff(virtualTree, newResults);
		resultsNode    = nuclear.patch(resultsNode, patches);
		virtualTree    = resultsNode;
	};

	return target;
}