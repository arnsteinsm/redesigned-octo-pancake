import { OrderInfo } from '../../Types/order';

const getShippingInfo = (orderJson: OrderInfo) => ({
  given_name: orderJson.shipping.first_name,
  family_name: orderJson.shipping.last_name,
  city: orderJson.shipping.city,
  postal_code: orderJson.shipping.postcode,
  street_address: orderJson.shipping.address_1,
  street_address_2: orderJson.shipping.address_2,
  phone: orderJson.billing.phone,
  email: orderJson.billing.email,
});

export const getBringBookingConfig = (
  orderJson: OrderInfo,
  antallKolli: number,
  test?: boolean
) => {
  const milliseconds = new Date().getTime() + 60000;
  const pakketype =
    orderJson.shipping_lines[0].method_title === 'Servicepakke'
      ? 'SERVICEPAKKE'
      : 'PA_DOREN';

  const orderID = String(orderJson.id);

  const shippingInfo = getShippingInfo(orderJson);

  let bringBookingConfig = {
    schemaVersion: 1,
    consignments: [
      {
        purchaseOrder: null,
        product: {
          id: pakketype,
          services: null,
          customsDeclaration: null,
          customerNumber: 'PARCELS_NORWAY-00001388867',
        },
        parties: {
          pickupPoint: null,
          recipient: {
            reference: orderID,
            city: shippingInfo.city,
            postalCode: shippingInfo.postal_code,
            additionalAddressInfo: '',
            contact: {
              name: shippingInfo.given_name + ' ' + shippingInfo.family_name,
              ...(test
                ? {
                    email: 'martinwahlberg@icloud.com',
                    phoneNumber: '46814434',
                  }
                : {
                    email: shippingInfo.email,
                    phoneNumber: shippingInfo.phone,
                  }),
            },
            countryCode: 'no',
            addressLine2: shippingInfo.street_address_2,
            name: shippingInfo.given_name + ' ' + shippingInfo.family_name,
            addressLine: shippingInfo.street_address,
          },
          sender: {
            reference: orderID,
            city: 'Hervik',
            postalCode: '5566',
            additionalAddressInfo: '',
            contact: {
              name: 'Rogaland Konservefabrikk AS',
              email: 'post@hervik.com',
              phoneNumber: '52754500',
            },
            countryCode: 'no',
            addressLine2: null,
            name: 'Rogaland Konservefabrikk AS',
            addressLine: 'Hervikneset 51',
          },
        },
        shippingDateTime: milliseconds,
        correlationId: 'Ordre_' + orderID,
        packages: new Array(antallKolli).fill({
          correlationId: 'Order_' + orderID,
          dimensions: {
            lengthInCm: null,
            heightInCm: null,
            widthInCm: null,
          },
          numberOfItems: null,
          packageType: null,
          containerId: null,
          weightInKg: 0.1,
          goodsDescription: '',
        }),
      },
    ],
    testIndicator: !!test,
  };

  return bringBookingConfig;
};
