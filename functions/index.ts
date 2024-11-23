import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as sgMail from '@sendgrid/mail';

const app = express();
app.use(cors());

interface EmailRequest {
  email: string;
  message: string;
}

app.post('/sendEmail', function (req: express.Request, res: express.Response) {
  console.log("%j", req.body);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const msg = {
    to: req.body.email,
    from: 'freddy.jetty.johnson@sap.com',
    subject: 'SendGrid sending from Firebase',
    text: req.body.message
  };
  sgMail.send(msg);
  console.log('Email Send Successfully!');
  res.send({
    email: req.body.email,
    message: req.body.message
  });
});

export const appFunction = functions.https.onRequest(app);
