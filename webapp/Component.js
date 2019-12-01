sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "./Firebase"
], function (UIComponent, JSONModel, Firebase) {
    "use strict";

    return UIComponent.extend("openUI5.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(Firebase.initializeFirebase(), "firebase");

            // Create a Fireauth reference
            var fireAuth = this.getModel("firebase").getProperty("/fireAuth");
            fireAuth.onAuthStateChanged(this.initializeGoogleAuth);
        },

        initializeGoogleAuth: function (user) {
            if (user) {
                console.log("User Signed In", user);
            } else {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
                firebase.auth().signInWithRedirect(provider);
            }
        }
    });
});