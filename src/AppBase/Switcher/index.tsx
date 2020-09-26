import React, { useContext } from "react";

import switcherStyles from "./switcher.module.css";
import AppButtonContainer from "./AppButtonContainer";
import UserInfoContainer from "./UserInfoContainer";
import { AuthContext } from "../../Context/AuthProvider";
import { APP_IDS } from "../../Types";
import ActionDialog from "./ActionDialog";
import TransferToKlarna from "../../TransferToKlarna";
import OrderFileExport from "../../OrderFileExport";

interface Props {
  appId?: APP_IDS;
}

const Switcher: React.FunctionComponent<Props> = ({ appId }) => {
  const { loginStatus } = useContext(AuthContext);
  if (loginStatus !== "LOGGED_IN") {
    return null;
  }
  return (
    <div className={switcherStyles.switcher}>
      <ActionDialog open={!!appId}>
        {appId === APP_IDS.KLARNA && <TransferToKlarna />}
        {appId === APP_IDS.VISMA && <OrderFileExport />}
      </ActionDialog>
      <UserInfoContainer />
      <AppButtonContainer />
    </div>
  );
};

export default Switcher;
