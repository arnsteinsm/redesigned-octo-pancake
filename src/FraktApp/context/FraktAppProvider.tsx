import React, { useReducer, createContext } from "react";
import { FraktAppState, Action, ContextProps } from "./fraktContextTypes";

interface Props {
  children: React.ReactNode;
}

const initialState = {
  visibleComponents: {
    showSpinnerRow: false,
    showOrderNumberInputRow: true,
    showOrderInfoRow: false,
    showActionDescriptionRow: false,
    showNumberOfPackagesInputRow: false,
    showActionsRow: false,
    showResetOrderButtonRow: false,
  },
  inputState: {
    orderID: "",
    numberOfPackages: "",
  },
};

export const FraktAppContext = createContext({} as ContextProps);

const appReducer = (state: FraktAppState, action: Action): FraktAppState => {
  switch (action.type) {
    case "SET_APP_LOADING":
      return {
        ...state,
        visibleComponents: {
          ...state.visibleComponents,
          showSpinnerRow: true,
          showOrderNumberInputRow: false,
          showOrderInfoRow: false,
          showActionDescriptionRow: false,
          showNumberOfPackagesInputRow: false,
          showActionsRow: false,
        },
      };

    case "SET_ORDER_LOADED":
      return {
        ...state,
        visibleComponents: {
          ...state.visibleComponents,
          showSpinnerRow: false,
          showOrderInfoRow: true,
          showActionDescriptionRow: true,
          showNumberOfPackagesInputRow: true,
          showResetOrderButtonRow: false,
        },
        orderInfo: action.payload,
        actionDescription: "Legg inn antall kolli:",
      };

    case "NUMBER_OF_PACKAGE_SELECTED":
      return {
        ...state,
        visibleComponents: {
          ...state.visibleComponents,
          showOrderInfoRow: true,
          showActionDescriptionRow: true,
          showNumberOfPackagesInputRow: false,
          showActionsRow: true,
        },
        actionDescription: "",
      };

    case "CREATE_SHIPPING_LABEL":
      return {
        ...state,
        visibleComponents: {
          ...state.visibleComponents,
          showOrderInfoRow: false,
          showActionDescriptionRow: false,
          showActionsRow: false,
          showOrderNumberInputRow: false,
          showSpinnerRow: true,
        },
      };

    case "SET_OTHER_ORDER_STATUS_ACTION":
      return {
        ...state,
        visibleComponents: {
          showNumberOfPackagesInputRow: false,
          showOrderInfoRow: false,
          showActionDescriptionRow: true,
          showActionsRow: false,
          showOrderNumberInputRow: true,
          showSpinnerRow: false,
          showResetOrderButtonRow: true,
        },
        actionDescription: action.payload?.text,
        possibleResetOrderId: action.payload?.orderID,
      };

    case "SET_ORDER_ID_INPUT":
      return {
        ...state,
        inputState: {
          ...state.inputState,
          orderID: action.payload,
        },
      };

    case "SET_NUMBER_OF_PACKAGES_ID_INPUT":
      return {
        ...state,
        inputState: {
          ...state.inputState,
          numberOfPackages: action.payload,
        },
      };

    case "EDIT_ORDER_POSTCODE":
      return state.orderInfo?.shipping
        ? {
            ...state,
            orderInfo: {
              ...state.orderInfo,
              shipping: {
                ...state.orderInfo?.shipping,
                postcode: action.payload,
              },
            },
          }
        : state;

    case "EDIT_ORDER_NAME":
      const r = action.payload.split(" ");
      const first_name = r.shift();
      const last_name = r.join();
      return state.orderInfo?.shipping
        ? {
            ...state,
            orderInfo: {
              ...state.orderInfo,
              shipping: {
                ...state.orderInfo.shipping,
                first_name: first_name || state.orderInfo.shipping.first_name,
                last_name: last_name || state.orderInfo.shipping.last_name,
              },
            },
          }
        : state;

    case "RESET_APP":
      return initialState;

    default:
      return { ...state };
  }
};

const AppProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <FraktAppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </FraktAppContext.Provider>
  );
};

export default AppProvider;
