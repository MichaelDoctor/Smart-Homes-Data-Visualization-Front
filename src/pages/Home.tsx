import React, { useState } from 'react';
import './Home.css';
import FilterContainer from '../components/FilterContainer';
import GraphContainer from '../components/GraphContainer';

const Home: React.FC = () => {
  const [data, setData] = useState('2019-04-29');
  return (
    <div className="appcontainer">
      <h1 className="centerhead">Smart Homes Data Visualization</h1>
      <h4 className="centerhead">Filter</h4>
      <FilterContainer setData={setData} />
      <GraphContainer title={data} />
    </div>
  );
};
export default Home;
