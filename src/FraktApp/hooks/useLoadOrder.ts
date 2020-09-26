import useFetchers from '../../hooks/useFetchers';
import { OrderInfo } from '../../Types/order';
import { getPdfFromNote, getOtherOrderStatusPayload } from '../utils';
import useAppActions from './useAppActions';

const useLoadOrder = () => {
  const { fetchOrder, fetchOrdreNotes } = useFetchers();
  const {
    showOtherOrderStatus,
    resetApp,
    showAppLoading,
    showOrderLoaded,
  } = useAppActions();

  const handleExistingOrder = (order: OrderInfo) => {
    const orderId = String(order.id);
    fetchOrdreNotes(orderId).then((notes) => {
      if (notes) {
        getPdfFromNote(notes);
      }
      showOtherOrderStatus(
        getOtherOrderStatusPayload(
          order.status,
          orderId,
          order.shipping.first_name,
          order.shipping.last_name
        )
      );
    });
  };

  return async (orderID?: string) => {
    resetApp();
    showAppLoading();
    if (orderID) {
      const orderInfo = await fetchOrder(orderID);
      if (orderInfo && !Array.isArray(orderInfo)) {
        if (orderInfo.status === 'klar-for-pakking') {
          showOrderLoaded(orderInfo);
        } else {
          handleExistingOrder(orderInfo);
        }
      } else {
        alert('Ordrenr finnes ikke! Meldingskode:1');
        resetApp();
      }
    }
  };
};

export default useLoadOrder;
