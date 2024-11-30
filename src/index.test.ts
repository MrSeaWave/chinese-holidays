import { describe, test, expect } from 'vitest';

import Holidays, { holidays } from './core/holidays-util';

import { isWorkingDay, isHoliday, isWeekEnd, getDateInfo, getHolidaysCache } from './index';

describe('chinese-holidays test', () => {
  test('holidays instance should be Holidays', () => {
    expect(holidays instanceof Holidays).toBeTruthy();
  });
  test('isHoliday should be right', async () => {
    const res1 = await isHoliday('2022-02-01');
    const res2 = await isHoliday('2022-02-07');
    const res3 = await isHoliday('2022-10-01');
    const res4 = await isHoliday('2022-04-02');
    const res5 = await isHoliday('2022-04-03');
    expect(res1).toBeTruthy();
    expect(res2).toBeFalsy();
    expect(res3).toBeTruthy();
    expect(res4).toBeFalsy();
    expect(res5).toBeTruthy();
  });
  test('2022-12-31 should be holiday', async () => {
    // 获取下一年（2025）的日期
    const res = await isHoliday('2022-12-31');
    expect(res).toBeTruthy();
  });

  test('2099-02-12 isHoliday', async () => {
    try {
      await isHoliday('2099-02-12');
    } catch (e) {
      expect((e as Error).message).toBe('Request failed with status code 404');
    }
  });

  test('isWorkingDay', async () => {
    const res1 = await isWorkingDay('2022-02-01');
    const res2 = await isWorkingDay('2022-02-07');
    const res3 = await isWorkingDay('2022-10-01');
    const res4 = await isWorkingDay('2022-04-02');
    const res5 = await isWorkingDay('2022-04-03');
    expect(res1).toBeFalsy();
    expect(res2).toBeTruthy();
    expect(res3).toBeFalsy();
    expect(res4).toBeTruthy();
    expect(res5).toBeFalsy();
  });

  test('isWeekEnd', async () => {
    const res1 = await isWeekEnd('2022-04-01');
    const res2 = await isWeekEnd('2022-04-02');
    const res3 = await isWeekEnd('2022-04-03');
    const res4 = await isWeekEnd('2022-04-09');
    expect(res1).toBeFalsy();
    expect(res2).toBeFalsy();
    expect(res3).toBeFalsy();
    expect(res4).toBeTruthy();
  });
  test('2022-01-28 getDateInfo', async () => {
    const res = await getDateInfo('2022-01-28');
    const { name, date, day, type } = res;
    expect(name).toBe('工作日');
    expect(date).toBe('2022-01-28');
    expect(day).toBe('星期五');
    expect(type).toBe(1);
  });
  test('2022-01-29 getDateInfo', async () => {
    const res = await getDateInfo('2022-01-29');
    const { name, date, day, type } = res;
    expect(name).toBe('春节 调班');
    expect(date).toBe('2022-01-29');
    expect(day).toBe('星期六');
    expect(type).toBe(4);
  });
  test('2022-01-31 getDateInfo', async () => {
    const res = await getDateInfo('2022-01-31');
    const { name, date, day, type } = res;
    expect(name).toBe('春节');
    expect(date).toBe('2022-01-31');
    expect(day).toBe('星期一');
    expect(type).toBe(3);
  });
  test('2022-02-12 getDateInfo', async () => {
    const res = await getDateInfo('2022-02-12');
    const { name, date, day, type } = res;
    expect(name).toBe('周末');
    expect(date).toBe('2022-02-12');
    expect(day).toBe('星期六');
    expect(type).toBe(2);
  });
  test('getHolidaysCache', () => {
    const res = getHolidaysCache();
    expect(res).toHaveProperty('2022');
  });
});
