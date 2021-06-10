import React, { ReactElement, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Filters, useStyles } from '../utils/selectHelpers';
import {
  dataReturn, devIdReturn, serialNumReturn, getURL, devType, serialType,
} from '../utils/apiReturnTypes';
import useFetch from '../utils/useFetch.hook';

interface Props{
  type: Filters;
}

interface SelectDetails {
  label: string;
  value: string;
  title: string;
}

const FilterSelect: React.FC<Props> = ({ type }): ReactElement => {
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

  const { loading, error } = useFetch(getURL(type), setList);

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
          name="value"
          inputProps={{
            id: `${type}-native-required`,
          }}
        >
          <option aria-label="None" value="" />
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
