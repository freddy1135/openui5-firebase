sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	'use strict';

	new ComponentContainer({
		name: "openUI5",
		settings: {
			id: "container"
		}
	}).placeAt("content");

});