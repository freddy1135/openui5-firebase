sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("openUI5.controller.App", {

		onInit: function (oEvent) {

			var firebaseModel = this.getView().getModel("firebase");
			var firestore = firebaseModel.getData().firestore;
			var collRefRecipients = firestore.collection("recipient");

			var oRecipient = {
				recipient: []
			};

			var recipientModel = new JSONModel(oRecipient);
			this.getView().setModel(recipientModel);
			// this.getRecipients(collRefRecipients);
			this.getRealTimeRecipients(collRefRecipients);
		},

		// getRecipients: function (collRefRecipients) {
		// 	collRefRecipients.get().then(
		// 		function (collection) {
		// 			var recipientModel = this.getView().getModel();
		// 			var recipientData = recipientModel.getData();
		// 			var recipients = collection.docs.map(function (oRecipient) {
		// 				return oRecipient.data();
		// 			});
		// 			recipientData.recipient = recipients;
		// 			this.getView().byId("recipientTable").getBinding("items").refresh();
		// 		}.bind(this));
		// },

		getRealTimeRecipients: function (collRefRecipients) {

			collRefRecipients.onSnapshot(function (snapshot) {
				var recipientModel = this.getView().getModel();
				var recipientData = recipientModel.getData();
				snapshot.docChanges().forEach(function (change) {

					var oRecipient = change.doc.data(),
						index;
					oRecipient.id = change.doc.id;

					if (change.type === "added") {
						recipientData.recipient.push(oRecipient);
					} else if (change.type === "modified") {
						index = recipientData.recipient.map(function (recipient) {
							return recipient.id;
						}).indexOf(oRecipient.id);
						recipientData.recipient[index] = oRecipient;
					} else if (change.type === "removed") {
						index = recipientData.recipient.map(function (recipient) {
							return recipient.id;
						}).indexOf(oRecipient.id);
						recipientData.recipient.splice(index, 1);
					}
				});

				this.getView().getModel().refresh(true);
				this.getView().byId("recipientTable").getBinding("items").refresh();
			}.bind(this));
		},

		onSendEmail: function (oEvent) {

			var oEntry = {
				"email": this.byId("email").getValue(),
				"message": this.byId("message").getValue()
			};

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
					MessageBox.error("Error while sending Email");
				}
			});

			var firebaseModel = this.getView().getModel("firebase");
			var firestore = firebaseModel.getData().firestore;
			var collRefRecipients = firestore.collection("recipient");
			collRefRecipients.add({
				email: oEntry.email,
				message: oEntry.message
			}).then(function (doc) {
				console.log("Element added with ID: ", doc.id);
			}).catch(function (err) {
				console.log("Error: ", err);
			});

		}
	});

});