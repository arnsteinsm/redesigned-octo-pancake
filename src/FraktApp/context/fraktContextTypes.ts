import { OrderInfo } from '../../Types/order';

interface VisibleComponents {
  showSpinnerRow: boolean;
  showOrderNumberInputRow: boolean;
  showOrderInfoRow: boolean;
  showActionDescriptionRow: boolean;
  showNumberOfPackagesInputRow: boolean;
  showActionsRow: boolean;
  showResetOrderButtonRow: boolean;
  showResetAppRow: boolean;
}

export interface OtherOrderStatusPayload {
  text: string;
  showResetOrderButtonRow?: Boolean;
}

interface InputState {
  orderID?: string;
  numberOfPackages?: number;
}

export interface FraktAppState {
  visibleComponents: VisibleComponents;
  orderInfo?: OrderInfo;
  inputState?: InputState;
  actionDescription?: string;
}

interface SET_ORDER_LOADING_ACTION {
  type: 'SHOW_APP_LOADING';
}
interface SHOW_ORDER_LOADED_ACTION {
  type: 'SHOW_ORDER_LOADED';
  payload: OrderInfo;
}

interface SHOW_FINAL_ACTIONS_ACTION {
  type: 'SHOW_FINAL_ACTIONS';
}

interface CREATE_SHIPPING_LABEL_ACTION {
  type: 'CREATE_SHIPPING_LABEL';
}

interface RESET_APP_ACTION {
  type: 'RESET_APP';
}

interface SET_ORDER_ID_ACTION {
  type: 'SET_ORDER_ID';
  payload: string;
}

interface SET_NUMBER_OF_PACKAGES_ACTION {
  type: 'SET_NUMBER_OF_PACKAGES';
  payload: number;
}

interface SHOW_OTHER_ORDER_STATUS {
  type: 'SHOW_OTHER_ORDER_STATUS';
  payload?: OtherOrderStatusPayload;
}

interface EDIT_ORDER_POSTCODE {
  type: 'EDIT_ORDER_POSTCODE';
  payload: string;
}

interface EDIT_ORDER_NAME {
  type: 'EDIT_ORDER_NAME';
  payload: string;
}

export type Action =
  | SET_ORDER_LOADING_ACTION
  | SHOW_ORDER_LOADED_ACTION
  | SHOW_FINAL_ACTIONS_ACTION
  | CREATE_SHIPPING_LABEL_ACTION
  | SET_ORDER_ID_ACTION
  | SET_NUMBER_OF_PACKAGES_ACTION
  | RESET_APP_ACTION
  | SHOW_OTHER_ORDER_STATUS
  | EDIT_ORDER_POSTCODE
  | EDIT_ORDER_NAME;

export interface ContextProps {
  state: FraktAppState;
  dispatch: React.Dispatch<Action>;
}
