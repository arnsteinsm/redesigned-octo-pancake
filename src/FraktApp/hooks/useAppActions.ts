import { useContext } from 'react';
import { FraktAppContext } from '../context/FraktAppProvider';
import { OrderInfo } from '../../Types/order';
import { OtherOrderStatusPayload } from '../context/fraktContextTypes';

const useAppActions = () => {
  const { dispatch } = useContext(FraktAppContext);

  const resetApp = () => dispatch({ type: 'RESET_APP' });

  const showAppLoading = () => dispatch({ type: 'SHOW_APP_LOADING' });

  const showOrderLoaded = (payload: OrderInfo) =>
    dispatch({ type: 'SHOW_ORDER_LOADED', payload });

  const showOtherOrderStatus = (payload: OtherOrderStatusPayload) =>
    dispatch({
      type: 'SHOW_OTHER_ORDER_STATUS',
      payload,
    });

  const showFinalActions = () => dispatch({ type: 'SHOW_FINAL_ACTIONS' });

  const setOrderId = (payload: string) =>
    dispatch({ type: 'SET_ORDER_ID', payload });

  const setNumberOfPackages = (payload: number) =>
    dispatch({ type: 'SET_NUMBER_OF_PACKAGES', payload });

  const editOrderPostcode = (payload: string) =>
    dispatch({ type: 'EDIT_ORDER_POSTCODE', payload });

  const editOrderName = (payload: string) =>
    dispatch({ type: 'EDIT_ORDER_NAME', payload });

  return {
    showFinalActions,
    resetApp,
    setOrderId,
    setNumberOfPackages,
    showAppLoading,
    showOtherOrderStatus,
    showOrderLoaded,
    editOrderPostcode,
    editOrderName,
  };
};

export default useAppActions;
