let functions = require('firebase-functions');
let express = require('express');
let app = express();
let sgMail = require('@sendgrid/mail');

app.post('/sendEmail', function (req, res) {
    console.log("%j", req.body);
        sgMail.setApiKey('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');
        var msg = {
        to: req.body.email,
        from: 'freddy.jetty.johnson@sap.com',
        subject: 'Sending with SendGrid is Fun',
        text: req.body.message
    };
    sgMail.send(msg);
    console.log('Email Send Successfully!');
    res.send({
        "statusCode" : "200",
        "email" : req.body.email,
        "message": req.body.message
    });
});
exports.app = functions.https.onRequest(app);