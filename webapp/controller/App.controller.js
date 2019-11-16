sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("openUI5.controller.App", {

		onSendEmail: function (oEvent) {

			var oEntry = {
				"email": this.byId("email").getValue(),
				"message": this.byId("message").getValue()
			}
			var that = this;
			$.ajax({
				type: "POST",
				url: '/sendEmail',
				dataType: "json",
				data: JSON.stringify(oEntry),
				contentType: "application/json",
				success: function (data) {
					MessageBox.success("Email Send Successfully");
					that.byId("email").setValue("");
					that.byId("message").setValue("");
				},

				error: function (err) {
					console.log(err);
					MessageBox.error("Error while sending Email");
				}
			});

		}
	});

});