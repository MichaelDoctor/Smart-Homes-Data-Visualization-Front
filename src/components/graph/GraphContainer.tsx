import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ResultGraph from './ResultGraph';
import {
  InputType, dataReturn, baseURL, endpoints,
  devIdReturn, serialNumReturn, dataHandler, DataPointReturn,
} from '../../utils/apiHelper';
import useFetch from '../../utils/useFetch.hook';
import Spinner from '../hoc/Spinner';

interface Props {
    data: InputType;
}

/**
 * Container for line graph
 * @param data InputType
 * @returns React component
 */
const GraphContainer: React.FC<Props> = ({ data }) => {
  const [
    readings,
    setReadings,
  ] = useState<dataReturn | devIdReturn | serialNumReturn | null>(null);

  const [loading, setLoading] = useState(true);
  const [dataPoints, setDataPoints] = useState<DataPointReturn[]>([]);

  useEffect(() => {
    setLoading(true);
  }, [data]);

  useEffect(() => {
    if (readings && loading) {
      // set loading to false to remove loading animation
      setLoading(false);
      setDataPoints(dataHandler((readings as dataReturn)));
    }
  }, [readings]);

  let endpoint = `${baseURL + endpoints.reading}?day=${data.date}`;
  if (data.Serial_Number !== 'Any') endpoint += `&sn=${data.Serial_Number}`;
  if (data.Device_ID !== 'Any') endpoint += `&id=${data.Device_ID}`;

  const { error } = useFetch(endpoint, setReadings);
  return (
    <div>
      <h3 className="centerhead">
        {'Electrical Consumption on '}
        {`${moment(data.date).format('LL')}`}
        <br />
        <em>
          {data.Serial_Number !== 'Any'
            ? `Serial Number: ${data.Serial_Number}`
            : 'Serial Number: Any'}
          <br />
          {data.Device_ID !== 'Any'
            ? `Device ID: ${data.Device_ID}`
            : 'Device ID: Any'}
          <br />
        </em>
      </h3>
      <div className="graphcontainer">
        {!loading && !error ? (
          <ResultGraph dataPoints={dataPoints} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default GraphContainer;
