import useFetchers from "../../hooks/useFetchers";
import useAppActions from "./useAppActions";

const useResetOrdre = (orderID?: string) => {
  const { resetApp, showAppAsLoading } = useAppActions();
  const { updateOrder } = useFetchers();

  if (!orderID) return null;

  return () => {
    if (window.confirm("Er det ordrenr: " + orderID + " du pakker nå?")) {
      if (
        window.confirm(
          "Er du sikker på at det er riktig ordrenr du har tastet inn? Ordrenummeret du har tastet inn er: " +
            orderID
        )
      ) {
        if (
          window.confirm(
            "Ønsker du virkelig å tilbakestille ordre " + orderID + "?"
          )
        ) {
          if (
            window.confirm(
              "Bekreft at det er ordrenr:" +
                orderID +
                " du ønsker å tilbakestille"
            )
          ) {
            showAppAsLoading();

            updateOrder(orderID, "klar-for-pakking").then((res) => {
              if (res) {
                alert("Ordrenr: " + orderID + " har blitt tilbakestillt");
              } else {
                alert("Det skjedde en feil, Prøv igjen Meldingskode:5");
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
