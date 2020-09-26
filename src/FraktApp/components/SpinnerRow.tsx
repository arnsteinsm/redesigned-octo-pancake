import React from 'react';
import Row from 'react-bootstrap/Row';
import CircularProgress from '@material-ui/core/CircularProgress';

const SpinnerRow = () => (
  <Row
    id="spinnerArea"
    className="mr-1 ml-1 mt-4"
    style={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={100} thickness={4} />
  </Row>
);

export default SpinnerRow;
