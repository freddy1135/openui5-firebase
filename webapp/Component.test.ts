import { initializeFirebase } from './Firebase';
import { UIComponent } from 'sap/ui/core/UIComponent';
import { JSONModel } from 'sap/ui/model/json/JSONModel';

describe('Component', () => {
  let component: UIComponent;

  beforeEach(() => {
    component = new UIComponent();
    component.setModel(initializeFirebase(), 'firebase');
  });

  it('should initialize Firebase model', () => {
    const firebaseModel = component.getModel('firebase') as JSONModel;
    expect(firebaseModel).toBeDefined();
    expect(firebaseModel.getProperty('/firestore')).toBeDefined();
    expect(firebaseModel.getProperty('/fireAuth')).toBeDefined();
  });

  it('should call onAuthStateChanged with initializeGoogleAuth', () => {
    const fireAuth = component.getModel('firebase').getProperty('/fireAuth');
    const spy = jest.spyOn(fireAuth, 'onAuthStateChanged');
    component.initializeGoogleAuth = jest.fn();
    fireAuth.onAuthStateChanged(component.initializeGoogleAuth);
    expect(spy).toHaveBeenCalledWith(component.initializeGoogleAuth);
  });
});
