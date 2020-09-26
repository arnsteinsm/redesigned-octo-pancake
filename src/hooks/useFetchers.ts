import { useContext } from 'react';
import { ApiCredentialsContext } from '../Context/ApiCredentialsProvider';

import { makeQuery } from '../commonUtils';
import { OrderInfo, OrderNote } from '../Types/order';
import { logError } from '../winston';
import axios from 'axios';

const useFetchers = () => {
  const { apiCredentials } = useContext(ApiCredentialsContext);

  const wordpressQuery = makeQuery({
    consumer_key: String(apiCredentials?.['wp_consumer_key']),
    consumer_secret: String(apiCredentials?.['wp_consumer_secret']),
  });

  const nettButikkBaseURL = 'https://nettbutikk.hervik.com/wp-json/wc/v3';

  const bringQuery = makeQuery({
    key: String(apiCredentials?.['X-MyBring-API-Key']),
  });

  const fetchOrdre = async (orderID: string) => {
    return axios
      .get<OrderInfo>(`${nettButikkBaseURL}/orders/${orderID}${wordpressQuery}`)
      .then((res) => res.data)
      .catch((e) => {
        logError('fetchOrdre', e);
      });
  };

  const fetchOrdreNotes = async (orderID: string) => {
    return axios
      .get<OrderNote[]>(
        `${nettButikkBaseURL}/orders/${orderID}/notes${wordpressQuery}`
      )
      .then((res) => res.data)
      .catch((e) => {
        logError('fetchOrdreNotes', e);
      });
  };

  const updateOrder = (orderID: string, status: string, meta_data?: object) =>
    axios
      .put(`${nettButikkBaseURL}/orders/${orderID}${wordpressQuery}`, {
        status: status,
        ...(meta_data ? { meta_data: meta_data } : {}),
      })
      .then((res) => res.data)
      .catch((e) => {
        logError('updateOrder', e);
      });

  const getBringBooking = (bringBooking: object) =>
    axios
      .post(
        `https://europe-west2-hervik-dash.cloudfunctions.net/getShippingLabel${bringQuery}`,
        bringBooking
      )
      .then((res) => res.data)
      .catch((e) => {
        logError('getBringBooking', e);
      });

  const makeOrderNote = (orderID: string, note: string) =>
    axios
      .post(`${nettButikkBaseURL}/orders/${orderID}/notes${wordpressQuery}`, {
        note,
      })
      .then((res) => res.data)
      .catch((e) => {
        logError('makeOrderNote', e);
      });

  return {
    fetchOrdre,
    fetchOrdreNotes,
    updateOrder,
    getBringBooking,
    makeOrderNote,
  };
};

export default useFetchers;
