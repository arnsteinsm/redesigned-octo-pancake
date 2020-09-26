import { useContext } from "react";
import { FraktAppContext } from "../context/FraktAppProvider";
import { OrderInfo } from "../../Types/order";
import { OtherOrderStatusPayload } from "../context/fraktContextTypes";

const useAppActions = () => {
  const { dispatch } = useContext(FraktAppContext);

  //Simple actions
  const resetApp = () => dispatch({ type: "RESET_APP" });

  const setOrderLoaded = (payload: OrderInfo) =>
    dispatch({ type: "SET_ORDER_LOADED", payload });

  const showAppAsLoading = () => dispatch({ type: "SET_APP_LOADING" });

  const setOrderID = (payload: string) =>
    dispatch({ type: "SET_ORDER_ID_INPUT", payload });

  const setNumberOfPackages = (payload: string) =>
    dispatch({ type: "SET_NUMBER_OF_PACKAGES_ID_INPUT", payload });

  const selectNumberOfPackages = () =>
    dispatch({ type: "NUMBER_OF_PACKAGE_SELECTED" });

  const setOtherOrderStatus = (payload: OtherOrderStatusPayload) =>
    dispatch({
      type: "SET_OTHER_ORDER_STATUS_ACTION",
      payload,
    });

  const editOrderPostcode = (payload: string) =>
    dispatch({ type: "EDIT_ORDER_POSTCODE", payload });

  const editOrderName = (payload: string) =>
    dispatch({ type: "EDIT_ORDER_NAME", payload });

  return {
    selectNumberOfPackages,
    resetApp,
    setOrderID,
    setNumberOfPackages,
    showAppAsLoading,
    setOtherOrderStatus,
    setOrderLoaded,
    editOrderPostcode,
    editOrderName,
  };
};

export default useAppActions;
