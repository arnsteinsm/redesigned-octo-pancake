import { OtherOrderStatusPayload } from '../context/fraktContextTypes';
import { OrderNote } from '../../Types/order';

const createElementFromHTML = (htmlString: string) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.getElementsByTagName('a')[0];
};

export const getPdfFromNote = (data: OrderNote[]) =>
  data
    .filter((d) => d.note.includes('lapp</a>'))
    .forEach((cur) => {
      if (cur) {
        const aElement = createElementFromHTML(cur.note);
        window.open(aElement.href);
      }
    });

export const getOtherOrderStatusPayload = (
  status: string,
  orderID: string,
  fName: string,
  lName: string
): OtherOrderStatusPayload => {
  const orderInfoText = `
    Er du sikker på at du har skrevet inn riktig ordrenr?</br>
    Valgt Ordre:</br>
    Ordrenr: ${orderID}</br>
    Navn: ${fName} ${lName}
    `;

  const contactOfficeText = 'Kontakt kontoret om noe ikke stemmer!';

  const getOrderInfoText = (orderStatusText: string) => `
    ${orderInfoText}</br>
    ${orderStatusText}</br>
    ${contactOfficeText}
    `;

  if (status === 'pakket') {
    //Button
    return {
      text: getOrderInfoText('Denne ordren er allerede pakket. Meldingskode:6'),
      showResetOrderButtonRow: true,
    };
  } else if (status === 'processing') {
    return {
      text: getOrderInfoText(
        'Denne ordren er enda ikke klar for pakking! Meldingskode:7'
      ),
    };
  } else if (status === 'completed') {
    return {
      text: getOrderInfoText('Denne ordren skal være sendt! Meldingskode:8'),
    };
  }
  if (status === 'cancelled') {
    return {
      text: getOrderInfoText('Denne ordren er kanselert! Meldingskode:9'),
    };
  } else {
    return {
      text: getOrderInfoText(`
    Denne ordren har en uhåndtert ordrestatus.
    Sjekk om du har riktig nummer. Meldingskode:10
    `),
    };
  }
};
