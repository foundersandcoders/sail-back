"use strict";


var h = require("virtual-dom/h");


module.exports.index = function (utils, state) {
	
	var that = {};

	that.render = function (state) {

		return module.exports.view(state, uploadMembers);
	};

    function uploadMembers () {
       
        var members      = state().upload.members;
        var memberLength = members.length;
        var chunkSize    = Math.ceil(memberLength/ 4);
        var index        = 0, membersArray = [];
      
        while (index < memberLength) {
            membersArray.push(members.slice(index, index+chunkSize));
            index += chunkSize;
        }
     
        var problems = [];
        membersArray.forEach(function (memberSet, index) {
       
            utils.request({
                method: "POST",
                url: "/upload?type=members",
                json: memberSet
            }, function (err, head, response) {
          
                if (!err) { 
                    problems = problems.concat(response.problems);
                }
                if (index === membersArray.length-1) {
                    state.upload.done.set("true");
                    state.upload.problems.set(problems);
                    state.panel.set("pending");
                }
            });
        });
    } 

	return that;
};


module.exports.view = function (state, confirmUpload) {

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
                    h("p", "Date joined") 
                ]),
                h("div", [
                    h("p", "Type") 
                ]),
                h("div", [
                    h("p", "Status") 
                ]) 
            ])
        ]),
        h("div.container.duplicate-content",
           
            state().upload.memberDuplicates.map(function (duplicate) {
            
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
                        h("p", String(duplicate.date_joined).split(" 00:00")[0]) 
                    ]),
                    h("div", [
                        h("p", String(duplicate.membership_type))
                    ]),
                    h("div", [
                        h("p", duplicate.activation_status) 
                    ]) 
                ])
            })
        ),
        h("div.button-container", [
            h("button.btn-primary.confirm", "Cancel"),
            h("button.btn-primary.confirm", {
                onclick: confirmUpload  
            }, "Upload without duplicates")
        ])
    ]);
}
