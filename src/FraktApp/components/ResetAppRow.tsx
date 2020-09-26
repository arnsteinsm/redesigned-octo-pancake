import React from 'react';
import BlockButtonRow from './BlockButtonRow';
import useAppActions from '../hooks/useAppActions';
const ResetAppRow: React.FunctionComponent = () => {
  const { resetApp } = useAppActions();
  return (
    <BlockButtonRow
      rowId="row7"
      buttonId="cancelButton"
      variant="danger"
      text="Avbryt"
      onClick={resetApp}
    />
  );
};
export default ResetAppRow;
