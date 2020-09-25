import Row from 'react-bootstrap/Row';
import React, { useContext } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import useAppActions from '../hooks/useAppActions';
import { FraktAppContext } from '../context/FraktAppProvider';

const NumberOfPackagesInputRow = () => {
  const { selectNumberOfPackages, setNumberOfPackages } = useAppActions();
  const { state } = useContext(FraktAppContext);
  return (
    <Row className='mr-1 ml-1' id='row5'>
      <InputGroup className='mb-3'>
        <FormControl
          type='text'
          id='antallPak'
          placeholder='Antall kolli'
          value={state.inputState.numberOfPackages}
          onChange={(event) => setNumberOfPackages(event.currentTarget.value)}
        />
        <InputGroup.Append>
          <Button
            variant='outline-success'
            id='submitNumButton'
            onClick={selectNumberOfPackages}
          >
            Bekreft
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Row>
  );
};

export default NumberOfPackagesInputRow;
