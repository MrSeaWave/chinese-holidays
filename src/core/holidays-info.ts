import { getMethod } from './request';

export interface HolidayInfo {
  /**
   * 节假日名字
   * e.g
   * 元旦
   */
  name: string;
  /**
   * 日期
   * e.g
   * 2024-01-01
   */
  date: string;
  /**
   * 是否为休息日
   */
  isOffDay: boolean;
}

/**
 * @desc 假期信息
 */
export class HolidaysInfo {
  holidays: {
    [year: string]: HolidayInfo[] | undefined;
  };

  constructor() {
    // 日期的缓存
    this.holidays = {};
  }

  /**
   * @desc 获取日期信息
   * @param {string} dateStr
   * @returns
   */
  async getDateInfo(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const holidays = await this.getHolidaysByYear(String(year));
    // see https://github.com/MrSeaWave/chinese-holidays/pull/124
    // 2022年12月31的节假日日期在2023年才能获得，有些时候会有调休
    if (date.getMonth() === 11) {
      const nextYear = year + 1;
      const nextHolidays = await this.getHolidaysByYear(String(nextYear));
      holidays.push(...nextHolidays);
    }
    return holidays.find((info) => info.date === dateStr);
  }

  /**
   * 获取当年的假期数据（包含节假日的调休
   * @param year
   */
  async getHolidaysByYear(year: string) {
    if (!this.holidays[year]) {
      await this._getRemoteData(year);
    }
    return this.holidays[year] || [];
  }

  // 从链接中获取新的年份信息
  async _getRemoteData(year: string) {
    // console.log(`------ Start: 获取远程日期(${year})数据中... ------`);
    const resp = await getMethod({ url: `/${year}.json` });
    // console.log('------ End: 结束获取 ------');
    const { success, data } = resp;
    if (!success) return;
    const { days = [] } = data || {};
    if (!days.length) throw new Error(`暂时没有 ${year} 年的放假数据，请稍后重试 `);
    this.holidays[year] = days;
  }

  // 获取本地holidays缓存
  getHolidaysCache() {
    return this.holidays;
  }
}
