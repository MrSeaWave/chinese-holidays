import { describe, test, expect } from 'vitest';

import { isValidDate, dateFormat, getWeekDay, isWeekEnd } from './utils';

describe('Chinese Holidays Utils Jest', () => {
  test('isValidDate', () => {
    // @ts-expect-error 判断是否合法
    expect(isValidDate('2022-01-02')).toBeFalsy();
    // @ts-expect-error 判断是否合法
    expect(isValidDate(new Date().getTime())).toBeFalsy();
    expect(isValidDate(new Date())).toBeTruthy();
  });
  test('dateFormat', () => {
    try {
      dateFormat('2022-01-45');
    } catch (e) {
      expect((e as Error).message).toBe('Invalid date: 2022-01-45');
    }
    expect(dateFormat('2022-01-02')).toBe('2022-01-02 08:00:00');
    expect(dateFormat(1644301265762)).toBe('2022-02-08 14:21:05');
    expect(dateFormat(new Date('2022-02-02'))).toBe('2022-02-02 08:00:00');
    expect(dateFormat(new Date('2022-02-02'), 'YYYY-MM-DD')).toBe('2022-02-02');
  });
  test('getWeekDay', () => {
    expect(getWeekDay('2022-02-02')).toBe('星期三');
    expect(getWeekDay(1644301265762)).toBe('星期二');
    expect(getWeekDay(new Date('2022-02-02'))).toBe('星期三');
    expect(getWeekDay(new Date('2022-02-06'))).toBe('星期日');
    expect(getWeekDay(new Date('2022-01-31'))).toBe('星期一');
  });
  test('isWeekEnd', () => {
    expect(isWeekEnd('2022-02-06')).toBeTruthy();
    expect(isWeekEnd(1644301265762)).toBeFalsy();
    expect(isWeekEnd(new Date('2022-02-06'))).toBeTruthy();
    expect(isWeekEnd('2022-02-05')).toBeTruthy();
    expect(isWeekEnd('2022-02-04')).toBeFalsy();
    expect(isWeekEnd('2022-01-31')).toBeFalsy();
  });
});
