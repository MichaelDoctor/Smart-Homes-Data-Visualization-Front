import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DateSelect from './DateSelect';
import FilterSelects from './FilterSelect';

interface Props {
  setData: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContainer: React.FC<Props> = ({ setData }) => {
  const [inputs, setInputs] = useState({
    date: '2019-04-29',
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    console.log('clicked');
    setData(inputs.date);
  };
  return (
    <div className="filtercontainer">
      <div className="filterselects">
        <div className="filterinner">
          <DateSelect setDate={setInputs} />
        </div>
        <div className="filterinner">
          <FilterSelects type="Serial_Number" />
          <FilterSelects type="Device_ID" />
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Go
      </Button>
    </div>
  );
};

export default FilterContainer;
