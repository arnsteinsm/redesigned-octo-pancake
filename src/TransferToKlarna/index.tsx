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
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import useFetchers from '../hooks/useFetchers';
import { logError } from '../winston';
import axios from 'axios';

const nettButikkBaseURL = 'https://nettbutikk.hervik.com/wp-json/wc/v3';

const TransferToKlarna: React.FunctionComponent = () => {
  const { apiCredentials } = useContext(ApiCredentialsContext);
  const [packedOrders, setPackedOrders] = useState<OrderInfo[]>();
  const [updatingOrdre, setUpdatingOrdre] = useState(false);
  const [orderError, setOrderError] = useState<number[]>([]);
  const [statuses, setStatuses] = useState<React.ReactNode[]>();
  const statusContainer = useRef<HTMLDivElement>(null);

  const { updateOrder } = useFetchers();

  const history = useHistory();

  const fetchPackedOrders = useCallback(async () => {
    const wordpressProcessingQuery = makeQuery({
      consumer_key: String(apiCredentials?.['wp_consumer_key']),
      consumer_secret: String(apiCredentials?.['wp_consumer_secret']),
      status: 'pakket',
      per_page: '100',
    });

    const wordpressProcessingURL = `${nettButikkBaseURL}/orders${wordpressProcessingQuery}`;
    axios
      .get<OrderInfo[]>(wordpressProcessingURL)
      .then((res) => setPackedOrders(res.data))
      .catch((e) => {
        logError('fetchPackedOrders', e);
      });
  }, [apiCredentials]);

  useEffect(() => {
    if (apiCredentials) {
      fetchPackedOrders();
    }
  }, [apiCredentials, fetchPackedOrders]);

  const closeAction = (
    <DialogActions>
      <Button onClick={() => history.push('/authed')} color='primary'>
        Lukk
      </Button>
    </DialogActions>
  );

  const addStatusMessage = (status: string, key: string) => {
    setStatuses((statusArray) => [
      ...(statusArray || []),
      <p key={key}>{status}</p>,
    ]);
    const statusContainer = document.getElementById('statuses');
    if (statusContainer) {
      statusContainer.scrollTo({ top: 100000 });
    }
  };

  const getKlarnaOrder = async () => {
    if (packedOrders) {
      setUpdatingOrdre(true);
      for (let index = 0; index < packedOrders.length; index++) {
        const wooOrder = packedOrders[index];
        const orderCount = index + 1;
        const totalOrderCount = packedOrders.length;

        const klarnaData = await axios
          .get(
            `https://europe-west2-hervik-dash.cloudfunctions.net/getKlarnaOrder?klarnaId=${
              wooOrder.transaction_id
            }&auth=${String(apiCredentials?.['klarnaAuth'])}`
          )
          .then((res) => res.data)
          .catch((e) => {
            setOrderError((errors) => [...errors, wooOrder.id]);
            logError('getKlarnaOrder', e);
          });

        addStatusMessage(
          `Hentet ordrenr ${wooOrder.id} fra klarna. Ordre ${orderCount} av ${totalOrderCount}`,
          String('HOFK' + wooOrder.id)
        );

        const wooShippingLine = wooOrder.shipping_lines.shift();

        const shipping_info = {
          shipping_company: 'Bring',
          shipping_method:
            wooShippingLine?.method_title === 'Servicepakke'
              ? 'PickUpPoint'
              : 'Home',
          tracking_number: wooOrder.meta_data.find(
            (meta) => meta.key === 'tracking_number'
          )?.value,
          tracking_uri: wooOrder.meta_data.find(
            (meta) => meta.key === 'tracking_url'
          )?.value,
        };

        const orderInfo = {
          captured_amount: klarnaData.order_amount - klarnaData.captured_amount,
          ...(shipping_info.tracking_number && shipping_info.tracking_uri
            ? { shipping_info: [shipping_info] }
            : {}),
        };

        await axios
          .post(
            `https://europe-west2-hervik-dash.cloudfunctions.net/captureKlarnaOrder?klarnaId=${
              wooOrder.transaction_id
            }&auth=${String(apiCredentials?.['klarnaAuth'])}`,
            orderInfo
          )
          .then(() => {
            addStatusMessage(
              `Ordrenr ${wooOrder.id} godkjent hos klarna. Ordre ${orderCount} av ${totalOrderCount}`,
              'OGK' + wooOrder.id
            );
          })
          .catch((e) => logError('TransferToKlarnaL137', e));

        await updateOrder(String(wooOrder.id), 'completed').then((res) => {
          if (res) {
            addStatusMessage(
              `Ordrenr ${wooOrder.id} flyttet til godkjent. Ordre ${orderCount} av ${totalOrderCount}`,
              'OFG' + wooOrder.id
            );
          } else {
            setOrderError((cur) => [...cur, wooOrder.id]);
          }
        });
      }
      setUpdatingOrdre(false);
    }
  };

  if (packedOrders) {
    return (
      <>
        <p>
          Det er {packedOrders.length} ordre klar for overføring til klarna!
        </p>
        {statuses ? (
          <>
            {updatingOrdre && <LinearProgress />}
            <div
              style={{ height: '200px', overflowX: 'scroll' }}
              id='statuses'
              ref={statusContainer}
            >
              {statuses}

              {!!orderError.length &&
                'Feil med ordre sjekk disse:' + orderError.join(', ')}
            </div>
          </>
        ) : (
          !updatingOrdre && (
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={() => {
                getKlarnaOrder();
              }}
            >
              Overfør til klarna
            </Button>
          )
        )}
        {!updatingOrdre && closeAction}
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
export default TransferToKlarna;
