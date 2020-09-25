import useAppActions from './useAppActions';
import { getBringBookingConfig } from '../utils/shipping';
import { OrderInfo } from '../../Types/order';
import useFetchers from '../../hooks/useFetchers';

const useGenerateShippingLabel = () => {
  const { showAppAsLoading, resetApp } = useAppActions();
  const { getBringBooking, updateOrder, makeOrderNote } = useFetchers();

  const moveToFullfort = (
    orderID: string,
    bringResponse: {
      consignments: {
        confirmation: {
          links: { tracking: string; labels: string };
          consignmentNumber: string;
        };
      }[];
    }
  ) => {
    const metaData = [
      {
        key: 'tracking_url',
        value: bringResponse.consignments[0].confirmation.links.tracking,
      },
      {
        key: 'tracking_number',
        value: bringResponse.consignments[0].confirmation.consignmentNumber,
      },
      {
        key: 'sending_label',
        value: bringResponse.consignments[0].confirmation.links.labels,
      },
    ];

    updateOrder(orderID, 'pakket', metaData).then((res) => {
      if (res) {
        afterLabel(orderID, bringResponse);
      } else {
        alert('Det skjedde en feil, Prøv igjen Meldingskode:2');
        resetApp();
      }
    });
  };

  const afterLabel = (
    orderID: string,
    bringResponse: {
      consignments: {
        confirmation: {
          links: { tracking: string; labels: string };
          consignmentNumber: string;
        };
      }[];
    }
  ) => {
    window.open(bringResponse.consignments[0].confirmation.links.labels);

    Promise.all([
      makeOrderNote(
        orderID,
        '<a href="' +
          bringResponse.consignments[0].confirmation.links.tracking +
          '" target="_blank">Spor sendingen</a>'
      ),
      makeOrderNote(
        orderID,
        '<a href="' +
          bringResponse.consignments[0].confirmation.links.labels +
          '" target="_blank">Last ned pakkelapp</a>'
      ),
      makeOrderNote(
        orderID,
        'Sendingsnr: ' +
          bringResponse.consignments[0].confirmation.consignmentNumber
      ),
    ])
      .then(() => {
        alert('Ordre oppdatert');
        resetApp();
      })
      .catch((err) => {
        window.alert(
          'Noe gikk galt under opplasting av pakkelapper til nettbutikken. Dette er ikke kritisk. Meldingskode:3'
        );
      });
  };

  return (orderJson: OrderInfo, antallKolli: number) => {
    showAppAsLoading();

    getBringBooking(getBringBookingConfig(orderJson, antallKolli, false)).then(
      (data) => {
        if (data) {
          moveToFullfort(String(orderJson.id), data);
        } else {
          alert('Generering av pakkelapp feilet Meldingskode:4');
        }
      }
    );
  };
};

export default useGenerateShippingLabel;
