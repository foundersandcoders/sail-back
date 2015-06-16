"use strict";


module.exports = function (h, state, request) {

    return {
        members: confirmMembers,
        payments: confirmPayments,
        pending: pending,
        done: done,
        generic: generic
    };

    function done () {

        return h("div.results-container", [
       
            h("div.table-title" [
                h("h2", "Upload complete") 
            ]),
            
            h("div.container", [
                h("h2", {
                    style: {
                        "text-align": "center"
                    }
                }, "Upload completed. There were " + state().upload.problems.length + " problems"),
                h("p", state().upload.problems) 
            ])
        ]); 
    }

    function generic () {
        return h("div"); // blonk page
    }

    function pending () {
        
        return h("div.results-container", [
       
            h("div.table-title", [
                h("h2", "Uploading...") 
            ])
        ]); 
    }

    function confirmMembers () {

        if (state().upload.memberDuplicates) {
        
            return h("div.results-container", [
                h("div.table-title", [
                    h("h2#file-length", "File length: " + state().upload.members.length)
                ]),
                renderButtons(uploadData("members", 4))
            ]);
       
        } else {
            return h("div.results-container", [
                h("div.table-title", [
                    h("h2", "Duplicate Members")
                ]),
                h("div.container.headers", [
                    h("div.row", [
                        h("div", [
                            h("p", "id") 
                        ]),
                        h("div", [
                            h("p", "last name") 
                        ]),
                        h("div", [
                            h("p", "name") 
                        ]),
                        h("div", [
                            h("p", "primary email") 
                        ]),
                        h("div", [
                            h("p", "date joined") 
                        ]),
                        h("div", [
                            h("p", "type") 
                        ]),
                        h("div", [
                            h("p", "status") 
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
                renderButtons(uploadData("members", 4))
            ]);
        }
    }

    function renderButtons (fn)  {
        return h("div.button-container", [
            h("button.btn-primary#cancel", {
                onclick: cancel 
            },"Cancel"),
            h("button.btn-primary#confirm-upload", {
                onclick: fn  
            }, "Upload")
        ])
    }

    function confirmPayments () {
        
        return h("div.results-container", [
            h("div.table-title", [
                h("h2", "Duplicate Payments")
            ]),
            h("div.container.duplicate-content", "File length: " + state().upload.paymentCount),
            renderButtons(uploadData("payments", 5))
        ]);
    }
    
    /**
     *  Upload to backend. Since the array of objects (payments or member)
     *  can potentially be big, the function splits the array in sub-arrays
     *  and uploads them in "chuncks".
     *
     *  Payments mock data:
        {
            amount: 5
            date: Wed Jan 03 1912 00:00:00 GMT+0000 (GMT)
            deleted: false
            member: "6085"
            notes: null
            reference: "61201"
            type_code: "8 - Standing Order"
        }
     *
     *
     */
    function uploadData (type, splitNum) {
    
        return function () {

            state.panel.set("pending");
            
            var data      = state().upload[type];
            var len       = data.length;
            var chunkSize = Math.ceil(len/splitNum);
            var ii        = 0;
            var arr       = [];
            
            while (ii < len) {
                arr.push(data.slice(ii, ii+chunkSize));
                ii += chunkSize;
            }
            
            var problems = [];

            arr.forEach(function (set, jj) {
            
                request({
                    method: "POST",
                    url: "/upload?type=" + type,
                    json: set
                }, function (err, head, response) {
                
                    if (!err) {
                        problems = problems.concat(response.problems);
                    }
                    if (jj === arr.length-1) {
                        state.upload.problems.set(problems);
                        state.panel.set("done");
                    }
                });
            });
        }
    }
    
    function cancel () {
        state.panel.set("");
    }
}

