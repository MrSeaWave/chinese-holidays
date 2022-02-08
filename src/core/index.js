/**
 * @desc 获取日期信息
 * @param date
 */
import { dateFormat, getWeekDay, isWeekEnd as utilsIsWeekEnd } from './utils';
import holidays from './holidays';

/**
 * @typedef dateInfo
 * @property {string} name 工作日，周末，春节,元旦，，，
 * @property {string} date 日期
 * @property {string} day 星期几
 * @property {number} type 1-工作日 2-周末 3-法定节假日 4-节假日调班
 */
/**
 * @desc 获取当前日期数据
 * @param {string | Date | number} date 日期
 * @returns {Promise<dateInfo>}
 */
export async function getDateInfo(date) {
  const dateStr = dateFormat(date, 'YYYY-MM-DD');
  const day = getWeekDay(date);
  // type: 1-工作日 2-周末 3 法定节假日 4 节假日调班
  const result = {
    name: '工作日',
    date: dateStr,
    day,
    type: 1
  };
  if (utilsIsWeekEnd(date)) {
    result.name = '周末';
    result.type = 2;
  }
  const holiday = await holidays.getDateInfo(dateStr);
  if (holiday) {
    const { isOffDay, name } = holiday;
    result.name = name + (isOffDay ? '' : ' 调班');
    result.type = isOffDay ? 3 : 4;
  }

  return result;
}

/**
 * @desc 判断是否是法定节假日
 * @param {string | Date | number} date 日期
 * @returns {Promise<boolean>}
 */
export async function isHoliday(date) {
  const info = await getDateInfo(date);
  return info.type === 3;
}

/**
 * @desc 判断是否是工作日（含节假日的调休）
 * @param date
 * @returns {Promise<boolean>}
 */
export async function isWorkingDay(date) {
  const info = await getDateInfo(date);
  return info.type === 1 || info.type === 4;
}

/**
 * @desc 判断是否是周末（不包含节假日调休上班）
 * @param date
 * @returns {Promise<boolean>}
 */
export async function isWeekEnd(date) {
  const info = await getDateInfo(date);
  return info.type === 2;
}
