import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { FraktAppContext } from '../context/FraktAppProvider';
import useAppActions from '../hooks/useAppActions';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const EditShippingDialog: React.FunctionComponent<Props> = ({
  open,
  handleClose,
}) => {
  enum EditOptions {
    POSTNUMMER = 'Postnummer',
    NAVN = 'Navn',
  }

  const { state } = useContext(FraktAppContext);

  const { editOrderName, editOrderPostcode } = useAppActions();

  const [selectedEditOption, setSelectedEditOption] = useState<
    EditOptions | undefined
  >();

  const [inputValue, setInputValue] = useState<string | undefined>();

  useEffect(() => {
    if (selectedEditOption === EditOptions.POSTNUMMER) {
      setInputValue(state.orderInfo?.shipping.postcode);
    } else if (selectedEditOption === EditOptions.NAVN) {
      setInputValue(
        `${state.orderInfo?.shipping.first_name} ${state.orderInfo?.shipping.last_name}`
      );
    }
  }, [
    EditOptions.NAVN,
    EditOptions.POSTNUMMER,
    selectedEditOption,
    state.orderInfo,
  ]);

  const beforeClose = () => {
    setSelectedEditOption(undefined);
    handleClose();
  };

  const onSubmit = () => {
    if (inputValue) {
      if (selectedEditOption === EditOptions.POSTNUMMER) {
        editOrderPostcode(inputValue);
      } else if (selectedEditOption === EditOptions.NAVN) {
        editOrderName(inputValue);
      }
    }
    beforeClose();
  };

  return (
    <Dialog open={open} onClose={beforeClose}>
      <DialogTitle>Rediger forsendelse</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="choices">Hva vil du endre?</label>
        <select
          id="choices"
          style={{ width: '200px', marginBottom: '13px' }}
          value={selectedEditOption}
          onChange={(event) => {
            setSelectedEditOption(event.currentTarget.value as EditOptions);
          }}
        >
          <option value="" disabled selected hidden>
            Velg
          </option>
          <option value={EditOptions.NAVN}>{EditOptions.NAVN}</option>
          <option value={EditOptions.POSTNUMMER}>
            {EditOptions.POSTNUMMER}
          </option>
        </select>
        <label htmlFor="editInput">Rediger:</label>
        <input
          id="editInput"
          type="text"
          disabled={!selectedEditOption}
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={beforeClose} color="primary">
          Avbryt
        </Button>
        <Button onClick={onSubmit} color="primary">
          Velg
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditShippingDialog;
