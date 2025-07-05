import { ApiResponse, getRemoteHolidaysApi, HolidayInfo, RemoteHolidaysInfoResp } from './apis';
import { BASE_URL } from './config';
import { WithRequiredProperty } from './type-utils';

export interface HolidaysInfoConfig {
  /**
   * cdn地址，默认是 https://fastly.jsdelivr.net/gh/NateScarlet/holiday-cn@master
   */
  baseUrl?: string;

  /**
   * 当未获取指定年份的假期时，扔出报错
   */
  throwFetchingError?: boolean;
}

/**
 * @desc 假期信息
 */
export class HolidaysInfo {
  /**
   * 日期的缓存
   */
  holidays: {
    [year: string]: HolidayInfo[] | undefined;
  } = {};

  /**
   * 请求缓存，防止请求出现并发的情况
   */
  private fetchingCache: Record<string, Promise<ApiResponse<RemoteHolidaysInfoResp>> | undefined> =
    {};

  config: WithRequiredProperty<HolidaysInfoConfig, 'baseUrl'>;

  constructor(config?: HolidaysInfoConfig) {
    this.config = {
      baseUrl: BASE_URL,
      ...(config || {}),
    };
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
    const resp = await this._getRemoteHolidaysWithCache(year);
    //await getMethod({ url: `/${year}.json` });
    // console.log('------ End: 结束获取 ------');
    const { success } = resp;
    if (!success) {
      delete this.fetchingCache[this.createFetchingCacheKey(year)];
      return;
    }
    const { days = [] } = resp.data || {};
    if (!days.length) {
      const msg = `暂时没有 ${year} 年的放假数据，请稍后重试`;
      if (this.config.throwFetchingError) {
        throw new Error(msg);
      }
      console.error(msg);
      return;
    }
    this.holidays[year] = days;
  }

  async _getRemoteHolidaysWithCache(year: string) {
    const key = this.createFetchingCacheKey(year);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (this.fetchingCache[key]) {
      return this.fetchingCache[key];
    }
    this.fetchingCache[key] = getRemoteHolidaysApi(year, { baseUrl: this.config.baseUrl });

    return this.fetchingCache[key];
  }

  private createFetchingCacheKey(year: string) {
    return `${this.config.baseUrl}/${year}`;
  }

  // 获取本地holidays缓存
  getHolidaysCache() {
    return this.holidays;
  }
}
