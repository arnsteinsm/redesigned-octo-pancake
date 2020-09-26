import { OrderInfo } from "../../Types/order";

interface VisibleComponents {
  showSpinnerRow: boolean;
  showOrderNumberInputRow: boolean;
  showOrderInfoRow: boolean;
  showActionDescriptionRow: boolean;
  showNumberOfPackagesInputRow: boolean;
  showActionsRow: boolean;
  showResetOrderButtonRow: boolean;
}

export interface OtherOrderStatusPayload {
  text: string;
  showResetOrderButtonRow?: Boolean;
  orderID?: string;
}

interface InputState {
  orderID: string;
  numberOfPackages: string;
}

export interface FraktAppState {
  visibleComponents: VisibleComponents;
  orderInfo?: OrderInfo;
  inputState: InputState;
  actionDescription?: string;
  possibleResetOrderId?: string;
}

interface SET_ORDER_LOADING_ACTION {
  type: "SET_APP_LOADING";
}
interface SET_ORDER_LOADED_ACTION {
  type: "SET_ORDER_LOADED";
  payload: OrderInfo;
}

interface NUMBER_OF_PACKAGE_SELECTED_ACTION {
  type: "NUMBER_OF_PACKAGE_SELECTED";
}

interface CREATE_SHIPPING_LABEL_ACTION {
  type: "CREATE_SHIPPING_LABEL";
}

interface RESET_APP_ACTION {
  type: "RESET_APP";
}

interface SET_ORDER_ID_INPUT_ACTION {
  type: "SET_ORDER_ID_INPUT";
  payload: string;
}

interface SET_NUMBER_OF_PACKAGES_ID_INPUT_ACTION {
  type: "SET_NUMBER_OF_PACKAGES_ID_INPUT";
  payload: string;
}

interface SET_OTHER_ORDER_STATUS_ACTION {
  type: "SET_OTHER_ORDER_STATUS_ACTION";
  payload?: OtherOrderStatusPayload;
}

interface EDIT_ORDER_POSTCODE {
  type: "EDIT_ORDER_POSTCODE";
  payload: string;
}

interface EDIT_ORDER_NAME {
  type: "EDIT_ORDER_NAME";
  payload: string;
}

export type Action =
  | SET_ORDER_LOADING_ACTION
  | SET_ORDER_LOADED_ACTION
  | NUMBER_OF_PACKAGE_SELECTED_ACTION
  | CREATE_SHIPPING_LABEL_ACTION
  | SET_ORDER_ID_INPUT_ACTION
  | SET_NUMBER_OF_PACKAGES_ID_INPUT_ACTION
  | RESET_APP_ACTION
  | SET_OTHER_ORDER_STATUS_ACTION
  | EDIT_ORDER_POSTCODE
  | EDIT_ORDER_NAME;

export interface ContextProps {
  state: FraktAppState;
  dispatch: React.Dispatch<Action>;
}
