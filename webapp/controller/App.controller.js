sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("openUI5.controller.App", {
		onPress: function () {
			MessageToast.show("Hello World!");
		}
	});
});