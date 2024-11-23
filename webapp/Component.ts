import UIComponent from "sap/ui/core/UIComponent";
import { initializeFirebase } from "./Firebase";

export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json"
    };

    public init(): void {
        // call the init function of the parent
        super.init();

        this.setModel(initializeFirebase(), "firebase");

        // Create a Fireauth reference
        const fireAuth = this.getModel("firebase")?.getProperty("/fireAuth");
        fireAuth.onAuthStateChanged(this.initializeGoogleAuth);
    }

    public initializeGoogleAuth(user: firebase.User | null): void {
        if (user) {
            console.log("User Signed In", user);
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().signInWithRedirect(provider);
        }
    }
}
