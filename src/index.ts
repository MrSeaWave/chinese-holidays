import Holidays, { holidays } from './core/holidays-util';

export const isWorkingDay = holidays.isWorkingDay;
export const isHoliday = holidays.isHoliday;
export const isWeekEnd = holidays.isWeekEnd;
export const getDateInfo = holidays.getDateInfo;
export const getHolidaysCache = holidays.getHolidaysCache;
// 测试编译包的语法，不要使用
export const __isHoliday__ = holidays?.isHoliday;

export { Holidays };
