import React, { useContext } from 'react';
import BlockButtonRow from './BlockButtonRow';
import useResetOrdre from '../hooks/useResetOrdre';
import { FraktAppContext } from '../context/FraktAppProvider';

const ResetOrderButtonRow: React.FunctionComponent = () => {
  const { state } = useContext(FraktAppContext);
  const resetOrder = useResetOrdre(state.orderInfo?.id);

  if (!resetOrder) return null;

  return (
    <>
      <BlockButtonRow
        variant="warning"
        text="Tilbakestill ordre"
        onClick={resetOrder}
      />
    </>
  );
};
export default ResetOrderButtonRow;
