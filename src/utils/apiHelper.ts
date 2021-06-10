/* eslint-disable camelcase */
import { Filters } from './selectHelpers';

/**
 * Contains reading, id, and serial endpoints.
 */
export const endpoints = {
  reading: '/api/reading',
  id: '/api/id',
  serial: '/api/serial',
};

// Change for build
export const baseURL = '';
// export const baseURL = 'http://localhost:5000';

export interface devType {
    Device_ID: string;
}

export interface serialType {
    Serial_Number: string;
}

export interface dataType {
  Serial_Number: string;
  DateTime: Date;
  Device_ID: string;
  Wattage: number;
}

export interface devIdReturn {
    type: string;
    results: devType[]
}

export interface serialNumReturn {
  type: string;
  results: serialType[];
}

export interface dataReturn {
  type: string;
  results: dataType[];
}

export interface InputType {
  date: string;
  Device_ID: string;
  Serial_Number: string;
}

/**
 * Gets url for different filter types.
 * @param type Filters
 * @returns a url string.
 */
export const getURL = (
  type: Filters,
): string => baseURL + (type === 'Device_ID' ? endpoints.id : endpoints.serial);

export interface DataPointReturn {
  x: Date;
  y: number;
}

/**
 * Returns only the DateTime and Wattage from readings
 * @param readings dataReturn
 * @returns all x and y dataPoints
 */
export const dataHandler = (readings: dataReturn): DataPointReturn[] => {
  const res = readings.results.map(({ DateTime, Wattage }) => ({
    x: DateTime,
    y: Wattage,
  }));
  return res;
};
