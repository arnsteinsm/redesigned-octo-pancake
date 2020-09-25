import { useContext } from 'react';
import { FraktAppContext } from '../context/FraktAppProvider';
import { getPdfFromNote, getOtherOrderStatusPayload } from '../utils';
import { OrderInfo } from '../../Types/order';
import useFetchers from '../../hooks/useFetchers';

const useAppActions = () => {
  const { dispatch } = useContext(FraktAppContext);

  const { fetchOrdre, fetchOrdreNotes } = useFetchers();

  const resetApp = () => dispatch({ type: 'RESET_APP' });

  const handleExistingOrder = (order: OrderInfo) => {
    const orderId = String(order.id);
    fetchOrdreNotes(orderId).then((notes) => {
      if (notes) {
        getPdfFromNote(notes);
      }
      dispatch({
        type: 'SET_OTHER_ORDER_STATUS_ACTION',
        payload: getOtherOrderStatusPayload(
          order.status,
          orderId,
          order.shipping.first_name,
          order.shipping.last_name
        ),
      });
    });
  };

  const loadOrder = async (orderID: string) => {
    resetApp();
    dispatch({ type: 'SET_APP_LOADING' });
    const orderInfo = await fetchOrdre(orderID);
    if (orderInfo && !Array.isArray(orderInfo)) {
      if (orderInfo.status === 'klar-for-pakking') {
        dispatch({ type: 'SET_ORDER_LOADED', payload: orderInfo });
      } else {
        handleExistingOrder(orderInfo);
      }
    } else {
      alert('Ordrenr finnes ikke! Meldingskode:1');
      resetApp();
    }
  };

  const selectNumberOfPackages = () =>
    dispatch({ type: 'NUMBER_OF_PACKAGE_SELECTED' });

  const editShippingInfo = () => alert('Rediger');

  const setOrderID = (orderID: string) =>
    dispatch({ type: 'SET_ORDER_ID_INPUT', payload: orderID });

  const setNumberOfPackages = (quantity: string) =>
    dispatch({ type: 'SET_NUMBER_OF_PACKAGES_ID_INPUT', payload: quantity });

  const showAppAsLoading = () => dispatch({ type: 'SET_APP_LOADING' });

  return {
    loadOrder,
    selectNumberOfPackages,

    resetApp,
    editShippingInfo,
    setOrderID,
    setNumberOfPackages,
    showAppAsLoading,
  };
};

export default useAppActions;
