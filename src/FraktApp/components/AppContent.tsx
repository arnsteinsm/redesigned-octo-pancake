import * as React from "react";

import SpinnerRow from "./SpinnerRow";
import OrderNumberInputRow from "./OrderNumberInputRow";
import OrderInfoRow from "./OrderInfoRow";
import ActionDescriptionRow from "./ActionDescriptionRow";
import NumberOfPackagesInputRow from "./NumberOfPackagesInputRow";

import { useContext } from "react";

import { FraktAppContext } from "../context/FraktAppProvider";
import ActionsRow from "./ActionButtons";
import ResetOrderButtonRow from "./ResetOrderButtonRow";

const AppContent = () => {
  const { state } = useContext(FraktAppContext);

  const {
    showActionsRow,
    showNumberOfPackagesInputRow,
    showActionDescriptionRow,
    showOrderInfoRow,
    showSpinnerRow,
    showOrderNumberInputRow,
    showResetOrderButtonRow,
  } = state.visibleComponents;

  return (
    <>
      {showOrderNumberInputRow && <OrderNumberInputRow />}
      {showSpinnerRow && <SpinnerRow />}
      {showOrderInfoRow && <OrderInfoRow />}
      {showActionDescriptionRow && <ActionDescriptionRow />}
      {showResetOrderButtonRow && <ResetOrderButtonRow />}
      {showNumberOfPackagesInputRow && <NumberOfPackagesInputRow />}
      {showActionsRow && <ActionsRow />}
    </>
  );
};

export default AppContent;
