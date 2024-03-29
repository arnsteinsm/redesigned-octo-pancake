import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

interface Props {
  rowId?: string;
  buttonId?: string;
  variant: 'success' | 'danger' | 'warning';
  text: string;
  onClick: () => void;
}

const BlockButtonRow: React.FunctionComponent<Props> = ({
  rowId,
  buttonId,
  variant,
  text,
  onClick,
}) => (
  <Row className="mr-1 ml-1 mt-2" id={rowId}>
    <div className="d-grid gap-2">
      <Button id={buttonId} variant={variant} onClick={onClick}>
        {text}
      </Button>
    </div>
  </Row>
);

export default BlockButtonRow;
