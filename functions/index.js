let functions = require('firebase-functions');
let express = require('express');
let app = express();

exports.app = functions.https.onRequest(app);
