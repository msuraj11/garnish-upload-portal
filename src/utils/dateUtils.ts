
import { format, parseISO, isValid } from 'date-fns';

/**
 * Format a Date or ISO string to a formatted date string
 * @param date The date to format
 * @param formatString The format string to use
 * @returns A formatted date string
 */
export const formatDate = (date: Date | string, formatString = 'MMM d, yyyy') => {
  try {
    if (date instanceof Date) {
      return isValid(date) ? format(date, formatString) : 'Invalid date';
    }
    else if (typeof date === 'string') {
      const parsedDate = parseISO(date);
      return isValid(parsedDate) ? format(parsedDate, formatString) : 'Invalid date';
    }
    return 'Invalid date';
  } catch (error) {
    console.error('Error formatting date:', date, error);
    return 'Invalid date';
  }
};
