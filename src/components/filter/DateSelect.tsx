import React, { ReactElement, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import { getDates, useStyles } from '../../utils/selectHelpers';
import { InputType } from '../../utils/apiHelper';

interface Props {
  inputs: InputType;
  setInputs: React.Dispatch<React.SetStateAction<InputType>>;
}

/**
 * Creates date dropdown component
 * @param inputs InputType
 * @param setInputs React.Dispatch<React.SetStateAction<InputType>>
 * @returns React component
 */
const DateSelect: React.FC<Props> = ({ inputs, setInputs }): ReactElement => {
  const classes = useStyles();
  const [state, setState] = useState<InputType>({ ...inputs });

  // handles data change in dropdown
  const handleChange = (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>,
  ): void => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: String(event.target.value),
    });
    setInputs({
      ...inputs,
      [name]: String(event.target.value),
    });
  };

  return (
    <div>
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="date-native-required">Date</InputLabel>
        <Select
          native
          value={state.date}
          onChange={handleChange}
          name="date"
          inputProps={{
            id: 'date-native-required',
          }}
        >
          <option value={state.date}>{moment(state.date).format('LL')}</option>
          <optgroup label="Available Dates">
            {getDates('2019-04-29', '2019-05-06').map((val) => (
              <option value={val} key={val}>
                {moment(val).format('LL')}
              </option>
            ))}
          </optgroup>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
};

export default DateSelect;
