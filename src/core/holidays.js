import { getMethod } from './request';

class Holidays {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Holidays();
    }
    return this.instance;
  }

  constructor() {
    // 日期的缓存
    this.holidays = {};
  }

  /**
   * @typedef remoteHolidays
   * @property {string} name 春节,元旦，，，
   * @property {string} date 日期
   * @property {boolean} isOffDay 是否为休息日
   */
  /**
   * @desc 获取日期信息
   * @param {string} dateStr
   * @returns {Promise<remoteHolidays>}
   */
  async getDateInfo(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const holidays = await this.getHolidaysByYear(year);
    if (date.getMonth() === 11) {
      try {
        holidays.push(...(await this.getHolidaysByYear(year + 1)))
      } catch (e) {
        // console.warn(`暂时没有 ${year + 1} 年的放假数据，当前结果可能不准确`)
      }
    }
    return holidays.find((info) => info.date === dateStr);
  }

  /**
   * 获取当年的假期数据（包含节假日的调休
   * @param year
   * @returns {Promise<*>}
   */
  async getHolidaysByYear(year) {
    if (!this.holidays[year]) {
      await this._getRemoteData(year);
    }
    return this.holidays[year];
  }

  // 从链接中获取新的年份信息
  async _getRemoteData(year) {
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

export default Holidays.getInstance();
