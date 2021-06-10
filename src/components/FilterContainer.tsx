import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DateSelect from './DateSelect';
import FilterSelects from './FilterSelect';
import { InputType } from '../utils/apiHelper';

interface Props {
  setData: React.Dispatch<React.SetStateAction<InputType>>;
}

const FilterContainer: React.FC<Props> = ({ setData }) => {
  const [inputs, setInputs] = useState<InputType>({
    date: '2019-04-29',
    Device_ID: 'Any',
    Serial_Number: 'Any',
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    console.log(inputs);
    setData({ ...inputs });
  };
  return (
    <div className="filtercontainer">
      <div className="filterselects">
        <div className="filterinner">
          <DateSelect setInputs={setInputs} />
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
