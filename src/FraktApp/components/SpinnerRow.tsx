import React from 'react';
import Row from 'react-bootstrap/Row';
//@ts-ignore
import Loader from '../loader.gif';

const SpinnerRow = () => (
  <Row id="spinnerArea" className="mr-1 ml-1">
    <img
      className="rounded mx-auto d-block"
      height="100px"
      width="100px"
      src={Loader}
      alt="Spinner"
    />
  </Row>
);

export default SpinnerRow;
