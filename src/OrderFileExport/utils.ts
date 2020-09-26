import { OrderInfo } from "../Types/order";

export const generateCsv = (processingOrders: OrderInfo[]) => {
  const newCsvTextField = (val: string) => `"${val}",`;
  const newCsvValueField = (val: any) => `${val},`;

  return processingOrders?.reduce((orderCsv, order) => {
    const dateCreated = new Date(order.date_created);
    const day = dateCreated.getDate();
    const month = dateCreated.getMonth() + 1;
    const year = String(dateCreated.getFullYear()).substr(2, 4);
    const orderHeader = newCsvTextField("OH");
    const orderNummer = newCsvTextField(`9000${order.id}`);
    const vGlobalDate = newCsvValueField(`${day}${month}${year}`);
    const varRef = newCsvTextField("Nettbutikk");
    const kunde = newCsvValueField("214704");
    const cusNam = newCsvTextField(
      `${order.billing.first_name} ${order.billing.last_name}`
    );
    const bi1 = newCsvTextField(order.billing.address_1);
    const bi2 = newCsvTextField(order.billing.address_2);
    const poCo = newCsvTextField(order.billing.postcode);
    const poCi = newCsvTextField(order.billing.city);
    const proTi = vGlobalDate.substring(0, vGlobalDate.length - 1);

    const orderHeaderLine =
      orderHeader +
      orderNummer +
      vGlobalDate +
      vGlobalDate +
      "0," +
      varRef +
      kunde +
      cusNam +
      bi1 +
      bi2 +
      '"",' +
      poCo +
      poCi +
      "0,0,0,0,0,0,0,0" +
      "\r\n";

    const orderLineFrakt =
      '"OL","999","Frakt",0,0,0,0,0,0,0,0,' +
      Number(order.shipping_total) +
      ",0.00,0.00,0.00,1," +
      proTi +
      "\r\n";

    const productLines = order.line_items.reduce((productCsv, product) => {
      const productLineHeader = newCsvTextField("OL");
      const productNumber = newCsvTextField(product.sku);
      const productName = newCsvTextField(product.name);
      const productQuantity = product.quantity;
      const productQuantityLine = newCsvValueField(productQuantity);
      const productPrice = newCsvValueField(product.price);

      return (
        productCsv +
        productLineHeader +
        productNumber +
        productName +
        "0,0,0,0,0,0,0,0," +
        productPrice +
        "0.00,0.00,0.00," +
        productQuantityLine +
        proTi +
        "\r\n"
      );
    }, "");

    return orderCsv + orderHeaderLine + orderLineFrakt + productLines;
  }, "");
};

export const getFileName = (date: Date) =>
  "OrdreFil_" +
  date.getDate() +
  (date.getMonth() + 1) +
  date.getFullYear() +
  date.getHours() +
  date.getMinutes() +
  ".csv";

export const downloadCsv = (csvString: string, filename: string) => {
  var hiddenElement = document.createElement("a");
  hiddenElement.href =
    "data:text/csv;charset=utf-8," + encodeURI("\uFEFF" + csvString);
  hiddenElement.target = "_blank";
  hiddenElement.download = filename;
  hiddenElement.click();
};
