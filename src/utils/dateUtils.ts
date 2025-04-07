
import { format, parseISO } from 'date-fns';

/**
 * Format a Date or ISO string to a formatted date string
 * @param date The date to format
 * @param formatString The format string to use
 * @returns A formatted date string
 */
export const formatDate = (date: Date | string, formatString = 'MMM d, yyyy') => {
  try {
    if (date instanceof Date) {
      return format(date, formatString);
    }
    else if (typeof date === 'string') {
      return format(parseISO(date), formatString);
    }
    return 'Invalid date';
  } catch (error) {
    console.error('Error formatting date:', date, error);
    return 'Invalid date';
  }
};
