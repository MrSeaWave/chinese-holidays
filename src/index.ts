import Holidays, { holidays } from './core/holidays-util';

export const isWorkingDay = holidays.isWorkingDay;
export const isHoliday = holidays.isHoliday;
export const isWeekEnd = holidays.isWeekEnd;
export const getDateInfo = holidays.getDateInfo;
export const getHolidaysCache = holidays.getHolidaysCache;

export { Holidays };
