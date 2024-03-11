import axios, { AxiosError } from 'axios';
import admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import functions from 'firebase-functions';
import { Request, Response } from 'express';

import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import cors from 'cors';

const corsMiddleware = cors({
  origin: [
    /.*\.hervik\.com$/,
    /^http:\/\/localhost(:\d+)?$/,
    /https?:\/\/.*hervik-.*\.web\.app$/,
  ],
});

admin.initializeApp();

exports.makeRecord = functions
  .region('europe-west2')
  .auth.user()
  .onCreate(async (user) => {
    try {
      const id = user.uid;
      const userObject = {
        email: user.email,
        approved: false,
        privileges: {
          klarna: false,
          posten: false,
          visma: false,
        },
      };

      await admin.database().ref(`/users/${id}/`).set(userObject);
    } catch (error) {
      console.error('Error creating user record:', error);
    }
  });

exports.getShippingLabel = onRequest(
  { region: 'europe-west2', cors: true },
  async (req: Request, res: Response) => {
    corsMiddleware(req, res, async () => {
      const { key } = req.query;
      const body = req.body;

      try {
        const response = await axios.post(
          'https://api.bring.com/booking-api/api/booking',
          body,
          {
            headers: {
              'X-MyBring-API-Uid': 'martin@hervik.com',
              'X-MyBring-API-Key': String(key),
              'X-Bring-Client-URL': 'https://hervik.com',
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-Frame-Options': 'allow',
            },
          }
        );
        res.status(response.status).send(response.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          // Axios error: extract the response status and data if available
          const axiosError = e as AxiosError;
          if (axiosError.response) {
            res
              .status(axiosError.response.status)
              .send(axiosError.response.data);
          } else {
            res
              .status(500)
              .send(
                'An error occurred while communicating with the Bring API.'
              );
          }
        } else {
          // Generic or unknown error: log and respond with a generic error message
          console.error(e);
          res.status(500).send('An unexpected error occurred.');
        }
      }
    });
  }
);

exports.getKlarnaOrder = onRequest(
  { region: 'europe-west2', cors: true },
  (req: Request, res: Response) => {
    corsMiddleware(req, res, async () => {
      const { klarnaId, auth } = req.query;

      if (typeof auth !== 'string') {
        res.status(400).send('Authorization token is missing or invalid.');
        return;
      }

      try {
        const response = await axios.get(
          `https://api.klarna.com/ordermanagement/v1/orders/${klarnaId}`,
          {
            headers: {
              Authorization: auth,
            },
          }
        );
        res.status(response.status).send(response.data);
      } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
      }
    });
  }
);

exports.captureKlarnaOrder = onRequest(
  { region: 'europe-west2', cors: true },
  async (req: Request, res: Response) => {
    corsMiddleware(req, res, async () => {
      const { auth, klarnaId } = req.query;
      const body = req.body;

      if (typeof auth !== 'string') {
        res.status(400).send('Authorization token is missing or invalid.');
        return;
      }

      try {
        const response = await axios.post(
          `https://api.klarna.com/ordermanagement/v1/orders/${klarnaId}/captures`,
          JSON.stringify(body),
          {
            headers: {
              Authorization: auth,
              'Content-Type': 'application/json; charset=utf-8',
            },
          }
        );
        res.status(response.status).send(response.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const axiosError = e as AxiosError;
          if (axiosError.response) {
            res
              .status(axiosError.response.status)
              .send(axiosError.response.data);
          } else {
            res
              .status(500)
              .send(
                'An error occurred while communicating with the Klarna API.'
              );
          }
        } else {
          console.error(e);
          res.status(500).send('An unexpected error occurred.');
        }
      }
    });
  }
);

exports.loggly = onRequest(
  { region: 'europe-west2', cors: true },
  (req: Request, res: Response) => {
    corsMiddleware(req, res, () => {
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
    });
  }
);
