import React, { useContext, useState } from 'react';
import BlockButtonRow from './BlockButtonRow';
import useAppActions from '../hooks/useAppActions';
import useGenerateShippingLabel from '../hooks/useGenerateShippingLabel';
import { FraktAppContext } from '../context/FraktAppProvider';
import EditShippingDialog from './EditShippingDialog';

//import { newPdfBrowser } from '../utils/pdfWindow';

const ActionsRow: React.FunctionComponent = () => {
  const { resetApp } = useAppActions();
  const { state } = useContext(FraktAppContext);
  const generateShippingLabel = useGenerateShippingLabel();
  const { orderInfo } = state;
  const numberOfPackages = parseInt(state.inputState.numberOfPackages);

  const [editShippingDialogOpen, setEditShippingDialogOpen] = useState(false);

  const handleEditShippingDialogClose = () => setEditShippingDialogOpen(false);

  if (orderInfo && !isNaN(numberOfPackages)) {
    return (
      <div style={{ marginTop: '70px' }}>
        <EditShippingDialog
          open={editShippingDialogOpen}
          handleClose={handleEditShippingDialogClose}
        />
        <BlockButtonRow
          rowId='row6'
          buttonId='makeLappButton'
          variant='success'
          text='Generer pakkelapp'
          onClick={() => generateShippingLabel(orderInfo, numberOfPackages)}
        />
        <BlockButtonRow
          rowId='row7'
          buttonId='cancelButton'
          variant='danger'
          text='Avbryt'
          onClick={resetApp}
        />
        <BlockButtonRow
          rowId='row8'
          buttonId='editInfoButton'
          variant='warning'
          text='Rediger'
          onClick={() => setEditShippingDialogOpen(true)}
        />
      </div>
    );
  }
  return null;
};

export default ActionsRow;
