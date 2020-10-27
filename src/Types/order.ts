interface Address {
  first_name: string;
  last_name: string;
  city: string;
  postcode: string;
  address_1: string;
  address_2: string;
}

interface Billing extends Address {
  phone: string;
  email: string;
}

interface Shipping_Line {
  instance_id: string;
}

interface Line_Items {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderInfo {
  id: number;
  shipping: Address;
  billing: Billing;
  status: string;
  shipping_lines: Shipping_Line[];
  date_created: string;
  shipping_total: string;
  line_items: Line_Items[];
  transaction_id: string;
  meta_data: { key: string; value: string }[];
}

export interface OrderNote {
  note: string;
}
