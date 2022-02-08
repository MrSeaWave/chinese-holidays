/**
 * @desc 判断日期是否符合规则
 * @param {string | Date | number} date 日期
 * @returns {boolean}
 */
import { WEEKS } from './config';

/**
 * @desc 判断是否是有效日期
 * @param {Date} date
 * @returns {boolean}
 */
export const isValidDate = (date) => date instanceof Date && !Number.isNaN(date.getTime());

/**
 * @desc 日期格式化
 * @param {string | Date | number} date 日期
 * @param {string} fmt 格式规则
 * @returns {string} 格式化后的日期
 */
export function dateFormat(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  if (!isValidDate(d)) {
    throw new Error(`Invalid date: ${date}`);
  }
  const opt = {
    'Y+': d.getFullYear().toString(), // 年
    'M+': (d.getMonth() + 1).toString(), // 月
    'D+': d.getDate().toString(), // 日
    'H+': d.getHours().toString(), // 小时
    'm+': d.getMinutes().toString(), // 分
    's+': d.getSeconds().toString(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3).toString(), // 季度
    S: d.getMilliseconds().toString() // 毫秒
  };

  Object.entries(opt).forEach(([k, val]) => {
    const ret = new RegExp(`(${k})`).exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? val : val.padStart(ret[1].length, '0'));
    }
  });
  return fmt;
}

/**
 * @desc 当前日期是星期几
 * @param {string | Date | number} date 日期
 * @returns {string}
 */
export function getWeekDay(date) {
  return WEEKS[new Date(date).getDay()];
}

/**
 * @desc 判断是否是周末
 * @param date
 */
export function isWeekEnd(date) {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
}
