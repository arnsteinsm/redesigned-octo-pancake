import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import useAppActions from '../hooks/useAppActions';
import { FraktAppContext } from '../context/FraktAppProvider';

const OrderNumberInputRow: React.FunctionComponent = () => {
  const { loadOrder, setOrderID } = useAppActions();
  const { state } = useContext(FraktAppContext);

  return (
    <Row id='row1' className='pt-2 mr-1 ml-1'>
      <InputGroup className='mb-3' id='ordreInp'>
        <FormControl
          type='text'
          placeholder='Legg inn ordrenr'
          value={state.inputState.orderID}
          onChange={(event) => setOrderID(event.currentTarget.value)}
        />
        <InputGroup.Append>
          <Button
            variant='outline-success'
            id='findOrderButton'
            onClick={() => loadOrder(state.inputState.orderID)}
            disabled={!state.inputState.orderID.length}
          >
            Finn ordre!
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Row>
  );
};

export default OrderNumberInputRow;
