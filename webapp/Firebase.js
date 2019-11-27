sap.ui.define([
    "sap/ui/model/json/JSONModel",
], function (JSONModel) {
    "use strict";

    var firebaseConfig = {
        apiKey: "AIzaSyAijigsTRBBxlS5PaZvkApccH2IPfhcopA",
        authDomain: "fred-openui5.firebaseapp.com",
        databaseURL: "https://fred-openui5.firebaseio.com",
        projectId: "fred-openui5",
        storageBucket: "fred-openui5.appspot.com",
        messagingSenderId: "303955249648",
        appId: "1:303955249648:web:9f0623ca2bc3ed7746f535",
        measurementId: "G-3MY7Z2XV7P"
    };

    return {
        initializeFirebase: function () {
            // Initialize Firebase with the Firebase-config
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();

            // Create a Firestore reference
            var firestore = firebase.firestore();

            // Firebase services object
            var oFirebase = {
                firestore: firestore
            };

            // Create a Firebase model out of the oFirebase service object which contains all required Firebase services
            var fbModel = new JSONModel(oFirebase);

            // Return the Firebase Model
            return fbModel;
        }
    };
});