'use strict';

var fs = require('fs');

function randomstring (num, max) {


	var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	return randomarray(letters, num, max);
}


function randomnumber (num, max) {

	return randomarray('123456789'.split(''), num, max);
}


function randomarray (arr, num, max) {

	var i;

	if (max) {
		var range = [];
		for (i = num; i < max; i += 1) range.push(i);
		num = range[Math.floor(Math.random() * range.length)];
	}

	var text = '';
	for (i = 0; i < num; i+=1) text += arr[Math.floor(Math.random() * arr.length)];
	return text;
}

var members = '';

var ii = 0;
while (ii < 10000) {

	var member = '';

	var id = Math.floor(Math.random() * 100000000000);
	var title = ['Mr', 'Mrs', 'Cpt.', 'Ms', 'Master', 'Mdm.'][Math.floor(Math.random()*6)];
	var initial = randomstring(1);
	var surname = randomstring(4, 10);
	var firstname = randomstring(4, 10);
	var postcode = randomstring(1, 2) + randomnumber(1, 2) + ' ' + randomnumber(1) + randomstring(2);
	var primary_email = randomstring(5, 10) + '@' + randomstring(5, 10) + ['.com', '.net', '.coop', '.io'][Math.floor(Math.random() * 4)];
	var secondary_email = randomstring(5, 10) + '@' + randomstring(5, 10) + ['.com', '.net', '.coop', '.io'][Math.floor(Math.random() * 4)];
	var gift_aid_signed = (Math.floor(Math.random() * 2) === 1) ? true: false;

	member += [id, title, initial, surname, firstname, postcode, primary_email, secondary_email, gift_aid_signed + '\n'].join(';')
	members += member;
	ii+=1;
}

fs.writeFile('generated_members.csv', members, function (err) {

	if (err) {
		throw err;
	} else {
		console.log('Created members.csv');
	}
});
