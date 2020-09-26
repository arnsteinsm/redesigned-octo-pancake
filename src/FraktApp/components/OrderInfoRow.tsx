import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { FraktAppContext } from '../context/FraktAppProvider';

const OrderInfoRow: React.FunctionComponent = () => {
  const { state } = useContext(FraktAppContext);
  if (!state.orderInfo) return null;
  return (
    <Row className="mr-1 ml-1">
      <Table id="tableRow">
        <thead>
          <tr>
            <th>Ordrenr</th>
            <th>Navn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="ordreIn">{state.orderInfo.id}</td>
            <td id="navnIn">
              {state.orderInfo.shipping.first_name}{' '}
              {state.orderInfo.shipping.last_name}
            </td>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};
export default OrderInfoRow;
