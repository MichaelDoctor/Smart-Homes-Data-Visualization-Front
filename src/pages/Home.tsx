import React, { useState } from 'react';
import './Home.css';
import FilterContainer from '../components/filter/FilterContainer';
import GraphContainer from '../components/graph/GraphContainer';
import { InputType } from '../utils/apiHelper';

/**
 * Container for all components on Home page
 * @returns Home Page component
 */
const Home: React.FC = () => {
  const [data, setData] = useState<InputType>({
    date: '2019-04-29',
    Device_ID: 'Any',
    Serial_Number: 'Any',
  });

  return (
    <div className="appcontainer">
      <h1 className="centerhead">Smart Homes Data Visualization</h1>
      <h4 className="centerhead">Filter</h4>
      <FilterContainer data={data} setData={setData} />
      <GraphContainer data={data} />
    </div>
  );
};
export default Home;
