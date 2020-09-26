import useFetchers from '../../hooks/useFetchers';
import useAppActions from './useAppActions';

const useResetOrdre = (orderID?: number) => {
  const { resetApp, showAppAsLoading } = useAppActions();
  const { updateOrder } = useFetchers();

  if (!orderID) return null;
  const orderIDString = String(orderID);

  return () => {
    if (window.confirm('Er det ordrenr: ' + orderIDString + ' du pakker nå?')) {
      if (
        window.confirm(
          'Er du sikker på at det er riktig ordrenr du har tastet inn? Ordrenummeret du har tastet inn er: ' +
            orderIDString
        )
      ) {
        if (
          window.confirm(
            'Ønsker du virkelig å tilbakestille ordre ' + orderIDString + '?'
          )
        ) {
          if (
            window.confirm(
              'Bekreft at det er ordrenr:' +
                orderIDString +
                ' du ønsker å tilbakestille'
            )
          ) {
            showAppAsLoading();

            updateOrder(orderIDString, 'klar-for-pakking').then((res) => {
              if (res) {
                alert('Ordrenr: ' + orderIDString + ' har blitt tilbakestillt');
              } else {
                alert('Det skjedde en feil, Prøv igjen Meldingskode:5');
              }
              resetApp();
            });
          } else {
            resetApp();
          }
        } else {
          resetApp();
        }
      } else {
        resetApp();
      }
    } else {
      resetApp();
    }
  };
};

export default useResetOrdre;
