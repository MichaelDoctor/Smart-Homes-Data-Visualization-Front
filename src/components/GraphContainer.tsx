import React from 'react';
import moment from 'moment';
import ResultGraph from './ResultGraph';

interface Props {
    title: string;
}

const GraphContainer: React.FC<Props> = ({ title }) => (
  <div>
    <h3 className="centerhead">{moment(title).format('LL')}</h3>
    <div className="graphcontainer">
      <ResultGraph />
    </div>
  </div>
);

export default GraphContainer;
