import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Filters, useStyles } from '../../utils/selectHelpers';
import {
  dataReturn, devIdReturn, serialNumReturn,
  getURL, devType, serialType, InputType,
} from '../../utils/apiHelper';
import useFetch from '../../utils/useFetch.hook';

interface Props {
  type: Filters;
  inputs: InputType;
  setInputs: React.Dispatch<React.SetStateAction<InputType>>;
}

interface SelectDetails {
  label: string;
  value: string;
  title: string;
}

/**
 * Creates filter drop down components
 * @param type Filters
 * @param inputs InputType
 * @param setInputs  React.Dispatch<React.SetStateAction<InputType>>
 * @returns React component
 */
const FilterSelect: React.FC<Props> = ({ type, inputs, setInputs }) => {
  const classes = useStyles();
  const [state, setState] = useState<SelectDetails>({
    label: type === 'Device_ID' ? 'ID' : 'SN',
    value: '',
    title: type === 'Device_ID' ? 'Device ID' : 'Serial Number',
  });
  const [
    list,
    setList,
  ] = useState<dataReturn | devIdReturn | serialNumReturn | null>(null);

  // Load list of filters
  const { loading, error } = useFetch(getURL(type), setList);

  // handles dropdown value change
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
      value: String(event.target.value),
    });
    setInputs({
      ...inputs,
      [name]: String(event.target.value),
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`${type}-native-required`}>
          {state.label}
        </InputLabel>
        <Select
          native
          value={state.value}
          onChange={handleChange}
          name={type}
          inputProps={{
            id: `${type}-native-required`,
          }}
        >
          <option value="Any">Any</option>
          <optgroup label={`${state.title}s`}>
            {!loading && list && !error
              ? list?.results.map((val) => {
                const value: string = type === 'Device_ID'
                  ? (val as devType).Device_ID
                  : (val as serialType).Serial_Number;
                return (
                  <option value={value} key={value}>
                    {value}
                  </option>
                );
              })
              : null}
          </optgroup>
        </Select>
        <FormHelperText>{type}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default FilterSelect;
