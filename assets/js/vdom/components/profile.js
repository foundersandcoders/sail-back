"use strict";

var nuclear = require("nuclear.js");
var h       = nuclear.h;
var utils   = require("../utils.js");

module.exports = {
    show: show,
    edit: edit
};

function show (state) {

    var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

    return (
        h("div.main-container", [
            h("div.inner-section-divider-small"),
            h("div.section-label", [
                h("h1#account", "Account info")
            ]),
            h("div.container-small", [

                h("div.inner-section-divider-medium"),

                list(currentInputValues),

                h("div.inner-section-divider-medium"),

                h("button#edit-account.align-one.btn-primary",{
                    onclick: state.channels.redirectTo.bind(this, state, "/profile/edit")
                }, "Modify"),

                h("div.inner-section-divider-small"),
                
                h("button.align-two.btn-primary", {
                    onclick: state.channels.redirectTo.bind(this, state, "/")
                }, "Home")
            ])
        ])
    );
};

function list (member) {

    var propertiesMapper = utils.mocks.memberPropsMapper;

    return propertiesMapper.map(function (elm) {
        return (
            h("div.details-list", [
                h("div.block", [
                    h(("p#" + elm.prop + ".left.meta"), elm.desc),
                    h(("p#value-" + elm.prop + ".right.meta"), member[elm.prop])
                ])
            ])
        )
    });
}

function edit (state) {

	var currentInputValues = utils.lazy({}).defaults(state.member()).toObject();

    return (
        h("div.main-container", [
            h("div.inner-section-divider-small"),
            h("div.section-label", [
                h("h1#edit-title", "Member information")
            ]),
            h("div.container-small", [

                h("div.inner-section-divider-medium"),

                listInputs(currentInputValues),

                h("div.inner-section-divider-medium"),

                h("button.align-one.btn-primary",{
                    onclick: state.channels.redirectTo.bind(this, state, "/profile")
                },"Back"),

                h("div.inner-section-divider-small"),

                h("button#save-cahnges.align-two.btn-primary", {
                    onclick: state.channels.updateProfile.bind(this, state, currentInputValues, nuclear)
                },"Save")
            ])
        ])
    );
}

function listInputs (member) {

    var propertiesMapper = utils.mocks.memberPropsMapper;

    return propertiesMapper.map(function (elm) {

        // console.log(elm.options);

        return (
            h("div.details-list.no-border", [
                h("div.block", [
                    h("p.left.meta", elm.desc),
                    (
                        elm.select === true
                        ? renderSelect(elm.options, member[elm.prop], "Click to select one", elm, member)
                        : renderInput(elm, member)
                    )
                ])
            ])
        )
    });
}

function renderInput (elmType, memberObj) {

    return (
        h(("input#" + elmType.prop), {
            type: "text",
            placeholder: elmType.desc,
            value: memberObj[elmType.prop],
            onchange: function () {
                return memberObj[elmType.prop] = this.value;
            }
        })
    );
}

function renderSelect (options, selectedOption, placeholder, elmType, memberObj) {

    return (
        h(("select.select-signup#" + elmType.prop), {
            onchange: function () {

                return memberObj[elmType.prop] = this.value;
            }
        },
            utils.vDomHelpers.renderOptionsSelected(options, selectedOption, placeholder)
        )
    );
}
