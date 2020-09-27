import Row from 'react-bootstrap/Row';
import React, { useContext } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import useAppActions from '../hooks/useAppActions';
import { FraktAppContext } from '../context/FraktAppProvider';

const NumberOfPackagesInputRow = () => {
  const {
    showFinalActions,
    setNumberOfPackages,
    showOrderLoaded,
  } = useAppActions();
  const { state } = useContext(FraktAppContext);

  const updateNumberOfPackages = (numberOfPackages: number) => {
    if (state.orderInfo) {
      showOrderLoaded(state.orderInfo);
      setNumberOfPackages(numberOfPackages);
    }
  };

  return (
    <Row className='mr-1 ml-1' id='row5'>
      <InputGroup className='mb-3'>
        <FormControl
          type='number'
          id='antallPak'
          placeholder='Antall kolli'
          value={state?.inputState?.numberOfPackages || ''}
          onChange={(event) =>
            updateNumberOfPackages(parseInt(event.currentTarget.value))
          }
        />
        <InputGroup.Append>
          <Button
            variant='outline-success'
            id='submitNumButton'
            onClick={showFinalActions}
            disabled={!state?.inputState?.numberOfPackages}
          >
            Bekreft
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Row>
  );
};

export default NumberOfPackagesInputRow;
