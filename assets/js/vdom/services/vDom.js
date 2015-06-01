var h = require("virtual-dom/h");

module.exports.renderOptionsSelected = renderOptionsSelected.bind(undefined, h);

function renderOptionsSelected (h, options, selectedOption, placeholder) {

	selectedOption = selectedOption || "";

	var firstPlaceholderOption = [
		h("option", {
			value: "",
			disabled: true,
			selected: true
		}, placeholder)
	];

	var element =  firstPlaceholderOption.concat(
		options.map(function (elm){
			var selected = (elm.value === selectedOption || elm.description === selectedOption);

			return h("option", {
				value:    elm.value,
				selected: selected
			}, elm.description);
		})
	);

	return element;
}