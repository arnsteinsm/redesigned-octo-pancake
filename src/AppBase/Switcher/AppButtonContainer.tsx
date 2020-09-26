import React, { useContext } from "react";
import AppButton from "./AppButton";

import switcherStyles from "./switcher.module.css";
import { APP_IDS } from "../../Types";
import { AuthContext } from "../../Context/AuthProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

const AppButtonContainer = () => {
  const { userDataState } = useContext(AuthContext);

  return (
    <div className={switcherStyles.buttonContainer}>
      {userDataState ? (
        <>
          {userDataState?.privileges[APP_IDS.POSTEN] && (
            <AppButton appId={APP_IDS.POSTEN} />
          )}
          {userDataState?.privileges[APP_IDS.KLARNA] && (
            <AppButton appId={APP_IDS.KLARNA} />
          )}
          {userDataState?.privileges[APP_IDS.VISMA] && (
            <AppButton appId={APP_IDS.VISMA} />
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default AppButtonContainer;
