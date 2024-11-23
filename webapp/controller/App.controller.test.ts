import JSONModel from 'sap/ui/model/json/JSONModel';
import AppController from './App.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(() => {
    controller = new AppController("test-app");
    const firebaseModel = new JSONModel({
      firestore: {},
      fireAuth: {
        onAuthStateChanged: jest.fn(),
      },
    });
    controller.getView = jest.fn().mockReturnValue({
      getModel: jest.fn().mockReturnValue(firebaseModel),
      byId: jest.fn().mockReturnValue({
        getValue: jest.fn().mockReturnValue('test@example.com'),
      }),
    });
  });

  it('should initialize Firebase model and set up auth state change listener', () => {
    const firebaseModel = controller.getView()?.getModel('firebase') as JSONModel;
    const fireAuth = firebaseModel.getProperty('/fireAuth');
    const spy = jest.spyOn(fireAuth, 'onAuthStateChanged');
    controller.onInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should send an email and add recipient to Firestore', async () => {
    const oEntry = {
      email: 'test@example.com',
      message: 'Hello, world!',
    };

    const ajaxMock = jest.spyOn($, 'ajax').mockImplementation((options) => {
      options.success(oEntry);
    });

    const firestoreMock = {
      collection: jest.fn().mockReturnValue({
        add: jest.fn().mockResolvedValue({ id: '123' }),
      }),
    };

    const firebaseModel = controller.getView()?.getModel('firebase') as JSONModel;
    firebaseModel.setProperty('/firestore', firestoreMock);

    await controller.onSendEmail();

    expect(ajaxMock).toHaveBeenCalledWith(expect.objectContaining({
      type: 'POST',
      url: '/sendEmail',
      dataType: 'json',
      data: JSON.stringify(oEntry),
      contentType: 'application/json',
    }));

    expect(firestoreMock.collection).toHaveBeenCalledWith('recipient');
    expect(firestoreMock.collection().add).toHaveBeenCalledWith(oEntry);
  });
});
