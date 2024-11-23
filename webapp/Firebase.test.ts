import { initializeFirebase } from './Firebase';
import { JSONModel } from 'sap/ui/model/json/JSONModel';

describe('Firebase', () => {
  it('should initialize Firebase and return a JSONModel', () => {
    const firebaseModel = initializeFirebase();
    expect(firebaseModel).toBeInstanceOf(JSONModel);
    expect(firebaseModel.getProperty('/firestore')).toBeDefined();
    expect(firebaseModel.getProperty('/fireAuth')).toBeDefined();
  });
});
