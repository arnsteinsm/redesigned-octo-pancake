import React, { useContext, useState } from 'react';
import BlockButtonRow from './BlockButtonRow';
import useGenerateShippingLabel from '../hooks/useGenerateShippingLabel';
import { FraktAppContext } from '../context/FraktAppProvider';
import EditShippingDialog from './EditShippingDialog';

const ActionsRow: React.FunctionComponent = () => {
  const { state } = useContext(FraktAppContext);
  const generateShippingLabel = useGenerateShippingLabel();
  const { orderInfo } = state;

  const numberOfPackages = state?.inputState?.numberOfPackages;

  const [editShippingDialogOpen, setEditShippingDialogOpen] = useState(false);

  if (orderInfo && numberOfPackages && !isNaN(numberOfPackages)) {
    return (
      <>
        <EditShippingDialog
          open={editShippingDialogOpen}
          handleClose={() => setEditShippingDialogOpen(false)}
        />
        <BlockButtonRow
          rowId="row6"
          buttonId="makeLappButton"
          variant="success"
          text="Generer pakkelapp"
          onClick={() => generateShippingLabel(orderInfo, numberOfPackages)}
        />
        <BlockButtonRow
          rowId="row8"
          buttonId="editInfoButton"
          variant="warning"
          text="Rediger"
          onClick={() => setEditShippingDialogOpen(true)}
        />
      </>
    );
  }
  return null;
};

export default ActionsRow;
