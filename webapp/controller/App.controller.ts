import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";

interface Recipient {
	id?: string;
	email: string;
	message: string;
}

export default class AppController extends Controller {
	private collRefRecipients: firebase.firestore.CollectionReference;

	onInit(): void {
		const firebaseModel = this.getView().getModel("firebase") as JSONModel;
		const firestore = firebaseModel.getData().firestore as firebase.firestore.Firestore;
		this.collRefRecipients = firestore.collection("recipient");

		const oRecipient = {
			recipient: [] as Recipient[]
		};

		const recipientModel = new JSONModel(oRecipient);
		this.getView().setModel(recipientModel);

		const fireAuth = firebaseModel.getProperty("/fireAuth") as firebase.auth.Auth;
		fireAuth.onAuthStateChanged((user: firebase.User | null) => {
			if (user) {
				this.getRealTimeRecipients(this.collRefRecipients);
			}
		});
	}

	getRealTimeRecipients(collRefRecipients: firebase.firestore.CollectionReference): void {
		collRefRecipients.onSnapshot((snapshot: firebase.firestore.QuerySnapshot) => {
			const recipientModel = this.getView().getModel() as JSONModel;
			const recipientData = recipientModel.getData();
			snapshot.docChanges().forEach((change: firebase.firestore.DocumentChange) => {
				const oRecipient: Recipient = change.doc.data() as Recipient;
				oRecipient.id = change.doc.id;

				if (change.type === "added") {
					recipientData.recipient.push(oRecipient);
				} else if (change.type === "modified") {
					const index = recipientData.recipient.findIndex((recipient: Recipient) => recipient.id === oRecipient.id);
					recipientData.recipient[index] = oRecipient;
				} else if (change.type === "removed") {
					const index = recipientData.recipient.findIndex((recipient: Recipient) => recipient.id === oRecipient.id);
					recipientData.recipient.splice(index, 1);
				}
			});

			recipientModel.refresh(true);
			this.getView().byId("recipientTable").getBinding("items").refresh();
		});
	}

	onSendEmail(): void {
		const oEntry = {
			email: this.byId("email").getValue(),
			message: this.byId("message").getValue()
		};

		$.ajax({
			type: "POST",
			url: '/sendEmail',
			dataType: "json",
			data: JSON.stringify(oEntry),
			contentType: "application/json",
			success: (data: { email: string; message: string }) => {
				MessageBox.success("Email Send Successfully");
				this.byId("email").setValue("");
				this.byId("message").setValue("");
			},
			error: (err: JQuery.jqXHR) => {
				MessageBox.error("Error while sending Email");
			}
		});

		const firebaseModel = this.getView().getModel("firebase") as JSONModel;
		const firestore = firebaseModel.getData().firestore as firebase.firestore.Firestore;
		const collRefRecipients = firestore.collection("recipient");
		collRefRecipients.add({
			email: oEntry.email,
			message: oEntry.message
		}).then((doc: firebase.firestore.DocumentReference) => {
			console.log("Element added with ID: ", doc.id);
		}).catch((err: Error) => {
			console.log("Error: ", err);
		});
	}
}
