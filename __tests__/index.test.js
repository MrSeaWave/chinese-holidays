import {
  isWorkingDay, isHoliday, isWeekEnd, getDateInfo
} from '../src';

describe('chinese-holidays Jest', () => {
  it('isHoliday', async () => {
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

  it('2099-02-12 isHoliday', async () => {
    try {
      await isHoliday('2099-02-12');
    } catch (e) {
      expect(e.message).toBe('Request failed with status code 404');
    }
  });

  it('isWorkingDay', async () => {
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

  it('isWeekEnd', async () => {
    const res1 = await isWeekEnd('2022-04-01');
    const res2 = await isWeekEnd('2022-04-02');
    const res3 = await isWeekEnd('2022-04-03');
    const res4 = await isWeekEnd('2022-04-09');
    expect(res1).toBeFalsy();
    expect(res2).toBeFalsy();
    expect(res3).toBeFalsy();
    expect(res4).toBeTruthy();
  });
  it('2022-01-28 getDateInfo', async () => {
    const res = await getDateInfo('2022-01-28');
    const {
      name, date, day, type
    } = res;
    expect(name).toBe('工作日');
    expect(date).toBe('2022-01-28');
    expect(day).toBe('星期五');
    expect(type).toBe(1);
  });
  it('2022-01-29 getDateInfo', async () => {
    const res = await getDateInfo('2022-01-29');
    const {
      name, date, day, type
    } = res;
    expect(name).toBe('春节 调班');
    expect(date).toBe('2022-01-29');
    expect(day).toBe('星期六');
    expect(type).toBe(4);
  });
  it('2022-01-31 getDateInfo', async () => {
    const res = await getDateInfo('2022-01-31');
    const {
      name, date, day, type
    } = res;
    expect(name).toBe('春节');
    expect(date).toBe('2022-01-31');
    expect(day).toBe('星期一');
    expect(type).toBe(3);
  });
  it('2022-02-12 getDateInfo', async () => {
    const res = await getDateInfo('2022-02-12');
    const {
      name, date, day, type
    } = res;
    expect(name).toBe('周末');
    expect(date).toBe('2022-02-12');
    expect(day).toBe('星期六');
    expect(type).toBe(2);
  });
});
