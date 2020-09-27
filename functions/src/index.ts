import * as functions from 'firebase-functions';
import axios from 'axios';

import admin from 'firebase-admin';

import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';

const cors = require('cors')({
  origin: [/.*\.hervik\.com$/, 'http://localhost:3000'],
});

admin.initializeApp(functions.config().firebase);

exports.makeRecord = functions
  .region('europe-west2')
  .auth.user()
  .onCreate((user) => {
    const id = user.uid;
    let userObject = {
      email: user.email,
      approved: false,
      privileges: {
        klarna: false,
        posten: false,
        visma: false,
      },
    };
    return admin.database().ref(`/users/${id}/`).set(userObject);
  });

exports.getShippingLabel = functions
  .region('europe-west2')
  .https.onRequest((req, res) => {
    cors(req, res, () => {
      const { key } = req.query;
      const body = req.body;

      axios
        .post('https://api.bring.com/booking/api/booking', body, {
          headers: {
            'X-MyBring-API-Uid': 'martin@hervik.com',
            'X-MyBring-API-Key': String(key),
            'X-Bring-Client-URL': 'https://hervik.com',
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Frame-Options': 'allow',
          },
        })
        .then((response) => {
          res.status(response.status).send(response.data);
        })
        .catch((e) => {
          functions.logger.error(e);
          res.status(500).send(e);
        });
    });
  });

exports.getKlarnaOrder = functions
  .region('europe-west2')
  .https.onRequest((req, res) =>
    cors(req, res, () => {
      const { klarnaId, auth } = req.query;

      axios
        .get(`https://api.klarna.com/ordermanagement/v1/orders/${klarnaId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .then((response) => {
          res.status(response.status).send(response.data);
        })
        .catch((e) => {
          functions.logger.error(e);
          res.status(500).send(e);
        });
    })
  );

exports.captureKlarnaOrder = functions
  .region('europe-west2')
  .https.onRequest((req, res) =>
    cors(req, res, () => {
      const { auth, klarnaId } = req.query;
      const body = req.body;

      axios
        .post(
          `https://api.klarna.com/ordermanagement/v1/orders/${klarnaId}/captures`,
          JSON.stringify(body),
          {
            headers: {
              Authorization: auth,
              'Content-Type': 'application/json; charset=utf-8',
            },
          }
        )
        .then((response) => {
          res.status(response.status).send(response.data);
        })
        .catch((e) => {
          functions.logger.error(e);
          res.status(500).send(e);
        });
    })
  );

exports.loggly = functions.region('europe-west2').https.onRequest((req, res) =>
  cors(req, res, () => {
    winston.add(
      new Loggly({
        token: '9c5f5918-6055-4f4f-b090-34a35af3aea0',
        subdomain: 'martinwahlberg',
        tags: ['hervik-dash'],
        json: true,
      })
    );

    const body = req.body;
    const { message, level } = req.query;

    if (typeof level === 'string' && typeof message === 'string') {
      winston.log(level, message, body);
      functions.logger.error({ level, message, body });
    }

    res.sendStatus(200);
  })
);
