import useFetchers from "../../hooks/useFetchers";
import { OrderInfo } from "../../Types/order";
import { getPdfFromNote, getOtherOrderStatusPayload } from "../utils";
import useAppActions from "./useAppActions";

const useLoadOrder = () => {
  const { fetchOrdre, fetchOrdreNotes } = useFetchers();
  const {
    setOtherOrderStatus,
    resetApp,
    showAppAsLoading,
    setOrderLoaded,
  } = useAppActions();

  const handleExistingOrder = (order: OrderInfo) => {
    const orderId = String(order.id);
    fetchOrdreNotes(orderId).then((notes) => {
      if (notes) {
        getPdfFromNote(notes);
      }
      setOtherOrderStatus(
        getOtherOrderStatusPayload(
          order.status,
          orderId,
          order.shipping.first_name,
          order.shipping.last_name
        )
      );
    });
  };

  return async (orderID: string) => {
    resetApp();
    showAppAsLoading();
    const orderInfo = await fetchOrdre(orderID);
    if (orderInfo && !Array.isArray(orderInfo)) {
      if (orderInfo.status === "klar-for-pakking") {
        setOrderLoaded(orderInfo);
      } else {
        handleExistingOrder(orderInfo);
      }
    } else {
      alert("Ordrenr finnes ikke! Meldingskode:1");
      resetApp();
    }
  };
};

export default useLoadOrder;
