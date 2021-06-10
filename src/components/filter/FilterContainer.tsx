import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DateSelect from './DateSelect';
import FilterSelects from './FilterSelect';
import { InputType } from '../../utils/apiHelper';

interface Props {
  data: InputType;
  setData: React.Dispatch<React.SetStateAction<InputType>>;
}

/**
 * Container for dropdown filters
 * @param data InputType
 * @param setData React.Dispatch<React.SetStateAction<InputType>>
 * @returns React component
 */
const FilterContainer: React.FC<Props> = ({ data, setData }) => {
  const [inputs, setInputs] = useState<InputType>({ ...data });

  // changes data when show results button is clicked
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setData({ ...inputs });
  };

  return (
    <div className="filtercontainer">
      <div className="filterselects">
        <div className="filterinner">
          <DateSelect inputs={inputs} setInputs={setInputs} />
        </div>
        <div className="filterinner">
          <FilterSelects
            type="Serial_Number"
            inputs={inputs}
            setInputs={setInputs}
          />
          <FilterSelects
            type="Device_ID"
            inputs={inputs}
            setInputs={setInputs}
          />
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Show Results
      </Button>
    </div>
  );
};

export default FilterContainer;
