import React, { useContext } from 'react';
import BlockButtonRow from './BlockButtonRow';
import useResetOrdre from '../hooks/useResetOrdre';
import { FraktAppContext } from '../context/FraktAppProvider';

const ResetOrderButtonRow: React.FunctionComponent = () => {
  const { state } = useContext(FraktAppContext);
  const resetOrdre = useResetOrdre(state.orderInfo?.id);

  if (!resetOrdre) return null;

  return (
    <>
      <BlockButtonRow
        variant="warning"
        text="Tilbakestill ordre"
        onClick={resetOrdre}
      />
    </>
  );
};
export default ResetOrderButtonRow;
