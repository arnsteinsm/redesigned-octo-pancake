import axios, { AxiosError } from 'axios';

export const logError = async (message: string, extra: AxiosError) => {
  const body = {
    response: extra.response,
    json: extra.toJSON(),
    message: extra.message,
  };
  axios.post(
    `https://europe-west2-hervik-dash.cloudfunctions.net/loggly?level=error&message=${message}`,
    body
  );
};
