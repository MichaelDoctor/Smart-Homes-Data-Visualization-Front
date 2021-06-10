import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';

// Filter columns
export type Filters = 'Device_ID' | 'Serial_Number';

/**
 * MaterialUI select styling
 */
export const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * Get list of valid dates based on datebase
 * @param startDate string min date
 * @param stopDate string max date
 * @returns a list of valid dates
 */
export const getDates = (startDate: string, stopDate: string): string[] => {
  const dateArray: string[] = [];
  let start = moment(startDate);
  const stop = moment(stopDate);
  while (start <= stop) {
    dateArray.push(moment(start).format('YYYY-MM-DD'));
    start = moment(start).add(1, 'days');
  }
  return dateArray;
};
