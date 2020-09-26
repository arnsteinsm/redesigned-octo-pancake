import React, { useContext } from "react";
import BlockButtonRow from "./BlockButtonRow";
import useResetOrdre from "../hooks/useResetOrdre";
import { FraktAppContext } from "../context/FraktAppProvider";
import useAppActions from "../hooks/useAppActions";

const ResetOrderButtonRow: React.FunctionComponent = () => {
  const { state } = useContext(FraktAppContext);
  const resetOrdre = useResetOrdre(state.possibleResetOrderId);
  const { resetApp } = useAppActions();
  if (!resetOrdre) return null;

  return (
    <>
      <BlockButtonRow
        variant="warning"
        text="Tilbakestill ordre"
        onClick={resetOrdre}
      />
      <BlockButtonRow
        variant="success"
        text="Det stemmer, tilbakestill app"
        onClick={resetApp}
      />
    </>
  );
};
export default ResetOrderButtonRow;
