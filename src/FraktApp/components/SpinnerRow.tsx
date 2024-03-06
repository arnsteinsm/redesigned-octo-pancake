import Row from 'react-bootstrap/Row';
import CircularProgress from '@mui/material/CircularProgress';

const SpinnerRow = () => (
  <Row
    id="spinnerArea"
    style={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <CircularProgress
      color="success"
      size={60}
      thickness={2}
      style={{
        padding: '0',
        marginTop: '40px',
      }}
    />
  </Row>
);

export default SpinnerRow;
