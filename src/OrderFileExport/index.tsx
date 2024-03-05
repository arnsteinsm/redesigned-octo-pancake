import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import { ApiCredentialsContext } from '../Context/ApiCredentialsProvider';
import { makeQuery } from '../commonUtils';
import { OrderInfo } from '../Types/order';
import { generateCsv, downloadCsv, getFileName } from './utils';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import DialogActions from '@mui/material/DialogActions';
import useFetchers from '../hooks/useFetchers';
import { logError } from '../winston';
import axios from 'axios';

const nettButikkBaseURL = 'https://nettbutikk.hervik.com/wp-json/wc/v3';

const OrderFileExport: React.FunctionComponent = () => {
  const { apiCredentials } = useContext(ApiCredentialsContext);
  const [processingOrders, setProcessingOrders] = useState<OrderInfo[]>();
  const [updatingOrdre, setUpdatingOrdre] = useState(false);
  const [ordreUpdated, setOrdreUpdated] = useState(false);
  const [ordreUpdateError, setOrdreUpdateError] = useState(false);
  const fileName = useRef(getFileName(new Date()));

  const navigate = useNavigate();

  const { updateOrder } = useFetchers();

  const fetchProcessingOrders = useCallback(() => {
    const wordpressProcessingQuery = makeQuery({
      consumer_key: String(apiCredentials?.['wp_consumer_key']),
      consumer_secret: String(apiCredentials?.['wp_consumer_secret']),
      status: 'processing',
      per_page: '100',
    });

    const wordpressProcessingURL = `${nettButikkBaseURL}/orders${wordpressProcessingQuery}`;

    axios
      .get<OrderInfo[]>(wordpressProcessingURL)
      .then((res) => setProcessingOrders(res.data))
      .catch((e) => logError('fetchProcessingOrders', e));
  }, [apiCredentials]);

  useEffect(() => {
    if (apiCredentials) {
      fetchProcessingOrders();
    }
  }, [apiCredentials, fetchProcessingOrders]);

  const updateOrders = async () => {
    setUpdatingOrdre(true);
    if (processingOrders) {
      for (let index = 0; index < processingOrders.length; index++) {
        const response = await updateOrder(
          String(processingOrders[index].id),
          'klar-for-pakking'
        );

        if (!response) {
          setOrdreUpdateError(true);
        }
      }
    }
    setOrdreUpdated(true);
    setUpdatingOrdre(false);
  };

  const closeAction = (
    <DialogActions>
      <Button onClick={() => navigate('/authed')} color="primary">
        Lukk
      </Button>
    </DialogActions>
  );

  if (ordreUpdated) {
    if (ordreUpdateError) {
      return (
        <div>
          Det skjedde en feil under oppdateringen av ordrefiler. Det kan hende
          at du må flytte noen til klar for pakking manuelt. Dagens filnavn er:
          {fileName.current}
          {closeAction}
        </div>
      );
    }
    return (
      <div>
        Ordre er oppdatert du kan nå lukke. Husk å sjekker at alt stemmer.
        Dagens filnavn er: {fileName.current}
        {closeAction}
      </div>
    );
  }

  if (updatingOrdre) {
    return (
      <div>
        <p>Oppdaterer ordrestatuser. Ikke lukk siden mens dette pågår!</p>
        <LinearProgress />
      </div>
    );
  }

  if (processingOrders) {
    return (
      <>
        <p>Det er {processingOrders.length} ordre klar for henting!</p>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            downloadCsv(generateCsv(processingOrders), fileName.current);
            updateOrders();
          }}
        >
          Last ned ordrefil
        </Button>
        {closeAction}
      </>
    );
  }

  return (
    <div>
      <p>Henter ordre</p>
      <LinearProgress />
      {closeAction}
    </div>
  );
};
export default OrderFileExport;
