"use strict";


var h = require("virtual-dom/h");


module.exports.index = function (utils, state) {
	
	var that = {};

	that.render = function (state) {

		return module.exports.view(state);
	};


	return that;
};

module.exports.view = function (state) {

    console.log("WIL");

    return h("div.results-container", [
    
        h("div.table-title", [
            h("h2", "Duplicates")
        ]),
        h("div.container.headers", [
            h("div.row", [
                h("div", [
                    h("p", "ID") 
                ]),
                h("div", [
                    h("p", "Last name") 
                ]),
                h("div", [
                    h("p", "Name") 
                ]),
                h("div", [
                    h("p", "Primary email") 
                ]),
                h("div", [
                    h("p", "Secondary email") 
                ]),
                h("div", [
                    h("p", "Date joined") 
                ]),
                h("div", [
                    h("p", "Type") 
                ]) 
            ])
        ]),
        h("div.container.duplicate-content",
           
            state().upload.duplicates.map(function (duplicate) {
            
                return  h("div.row", [
                    h("div", [
                        h("p", duplicate.id) 
                    ]),
                    h("div", [
                        h("p", duplicate.last_name) 
                    ]),
                    h("div", [
                        h("p", [duplicate.initials, duplicate.first_name,
                        duplicate.initials].join(" ")) 
                    ]),
                    h("div", [
                        h("p", duplicate.primary_email) 
                    ]),
                    h("div", [
                        h("p", duplicate.secondary_email) 
                    ]),
                    h("div", [
                        h("p", String(duplicate.date_joined)) 
                    ]),
                    h("div", [
                        h("p", String(duplicate.membership_type))
                    ]) 
                ])
            })
        )
    ]);
}
