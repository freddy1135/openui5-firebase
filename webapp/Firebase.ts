import JSONModel from "sap/ui/model/json/JSONModel";

const firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
} = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: "fred-openui5.firebaseapp.com",
    databaseURL: "https://fred-openui5.firebaseio.com",
    projectId: "fred-openui5",
    storageBucket: "fred-openui5.appspot.com",
    messagingSenderId: "303955249648",
    appId: "1:303955249648:web:9f0623ca2bc3ed7746f535",
    measurementId: "G-3MY7Z2XV7P"
};

interface FirebaseServices {
    firestore: firebase.firestore.Firestore;
    fireAuth: firebase.auth.Auth;
}

export function initializeFirebase(): JSONModel {
    // Initialize Firebase with the Firebase-config
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // Create a Firestore reference
    const firestore: firebase.firestore.Firestore = firebase.firestore();

    const fireAuth: firebase.auth.Auth = firebase.auth();

    // Firebase services object
    const oFirebase: FirebaseServices = {
        firestore: firestore,
        fireAuth: fireAuth
    };

    // Create a Firebase model out of the oFirebase service object which contains all required Firebase services
    const fbModel: JSONModel = new JSONModel(oFirebase);

    // Return the Firebase Model
    return fbModel;
}
