import { HolidaysInfo } from './holidays-info';
import { AcceptDateType, dateFormat, getWeekDay, isWeekEnd as utilsIsWeekEnd } from './utils';

export enum EDateType {
  /**
   * 工作日
   */
  WorkDay = 1,
  /**
   * 周末
   */
  WeekEnd = 2,
  /**
   * 法定节假日
   */
  Holiday = 3,
  /**
   * 调休，节假日调班
   */
  LeaveInLieu = 4,
}

type DateInfo = {
  /**
   * 工作日，周末，春节,元旦，，，
   */
  name: string;
  /**
   * 日期
   */
  date: string;
  /**
   * 星期几
   */
  day: string;
  /**
   * 类型
   */
  type: EDateType;
};

/**
 * 判定日期的工具集
 */
class Holidays {
  holidaysInfo: HolidaysInfo;
  static instance: Holidays;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Holidays();
    }
    return this.instance;
  }

  constructor() {
    this.holidaysInfo = new HolidaysInfo();
  }

  /**
   * @desc 获取当前日期数据
   * @param {string | Date | number} date 日期
   */
  getDateInfo = async (date: AcceptDateType) => {
    const dateStr = dateFormat(date, 'YYYY-MM-DD');
    const day = getWeekDay(date);
    // type: 1-工作日 2-周末 3 法定节假日 4 节假日调班
    const result: DateInfo = {
      name: '工作日',
      date: dateStr,
      day,
      type: 1,
    };
    if (utilsIsWeekEnd(date)) {
      result.name = '周末';
      result.type = 2;
    }
    const holiday = await this.holidaysInfo.getDateInfo(dateStr);
    if (holiday) {
      const { isOffDay, name } = holiday;
      result.name = name + (isOffDay ? '' : ' 调班');
      result.type = isOffDay ? 3 : 4;
    }

    return result;
  };

  /**
   * @desc 判断是否是法定节假日
   * @param {AcceptDateType} date 日期
   */
  isHoliday = async (date: AcceptDateType) => {
    const info = await this.getDateInfo(date);
    return info.type === EDateType.Holiday;
  };

  /**
   * @desc 判断是否是工作日（含节假日的调休）
   * @param date
   */
  isWorkingDay = async (date: AcceptDateType) => {
    const info = await this.getDateInfo(date);
    return info.type === EDateType.WorkDay || info.type === EDateType.LeaveInLieu;
  };

  /**
   * @desc 判断是否是周末（不包含节假日调休上班）
   * @param date
   */
  isWeekEnd = async (date: AcceptDateType) => {
    const info = await this.getDateInfo(date);
    return info.type === EDateType.WeekEnd;
  };

  /**
   * @desc 获取本地的假期缓存数据
   */
  getHolidaysCache = () => {
    return this.holidaysInfo.getHolidaysCache();
  };
}

export const holidays = Holidays.getInstance();

export default Holidays;
