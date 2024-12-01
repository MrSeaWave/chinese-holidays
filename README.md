# chinese-holidays

中国法定节假日查询，判断当前日期是否是节假日

数据源来自 [holiday-cn](https://github.com/NateScarlet/holiday-cn)（自动每日抓取[国务院公告](http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm)）

[![npm (scoped)](https://img.shields.io/npm/v/@swjs/chinese-holidays)](https://www.npmjs.com/package/@swjs/chinese-holidays)
[![npm](https://img.shields.io/npm/dw/@swjs/chinese-holidays)](https://www.npmjs.com/package/@swjs/chinese-holidays)
[![TESTS CI](https://github.com/MrSeaWave/chinese-holidays/actions/workflows/tests.yml/badge.svg?branch=main&event=push)](https://github.com/MrSeaWave/chinese-holidays/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/MrSeaWave/chinese-holidays/branch/main/graph/badge.svg?token=u4OCGK2Cuw)](https://codecov.io/gh/MrSeaWave/chinese-holidays)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

## 安装

```bash
$ npm i @swjs/chinese-holidays
```

## 基本用法

```js
import { isWorkingDay, isHoliday, isWeekEnd, getDateInfo, Holidays } from '@swjs/chinese-holidays';

async function main() {
  const date = '2022-02-01';
  //  判断 2022-02-01  是不是节假日
  await isHoliday(date); // true
  //  判断 2022-01-29  是不是节假日
  await isHoliday('2022-01-29'); // false
  //  判断 2022-01-31  是不是节假日
  await isHoliday('2022-01-31'); // true

  // 判断 2022-02-01 是不是工作日
  await isWorkingDay(date); // false
  //  判断 2022-01-29  是不是工作日 （含法定调休上班
  await isWorkingDay('2022-01-29'); // true

  //  判断 2022-01-29  是不是正常休息的周末 （不含法定调休上班
  await isWeekEnd('2022-01-29'); // false
  //  判断 2022-04-09  是不是正常休息的周末
  await isWeekEnd('2022-04-09'); // true

  // 获取日期信息
  await getDateInfo('2022-02-01');
  // 返回如下数据
  //   {
  //   "name": "春节",
  //   "date": "2022-02-01",
  //   "day": "星期二",
  //   "type": 3
  // }

  // 自己手动替换baseUrl参数
  let holidays = new Holidays({
    baseUrl: 'https://gcore.jsdelivr.net/gh/NateScarlet/holiday-cn@master',
  });
  await holidays.isHoliday('2022-12-31').then(console.log);
}
```

## 参数

`isWorkingDay, isHoliday, isWeekEnd, getDateInfo` 所需要的参数如下：

| 参数 | 说明 | 类型                       | 默认值 |
| :--- | :--- | :------------------------- | :----- |
| date | 日期 | `string \| Date \| number` | -      |

### `isWorkingDay`

判断当前日期是否是工作日（含节假日的调休）

返回值为 boolean 类型

### `isHoliday`

判断当前日期是否是法定节假日

返回值为 boolean 类型

### `isWeekEnd`

判断当前日期是否是周末（不包含节假日调休上班）（如果周六为调休上班，则为 FALSE，不算做周末

返回值为 boolean 类型

### `getDateInfo`

返回值为：

```js
/**
 * @typedef dateInfo
 * @property {string} name 工作日，周末，春节,元旦，，，
 * @property {string} date 日期
 * @property {string} day 星期几
 * @property {number} type 1-工作日 2-周末 3-法定节假日 4-节假日调班
 */
const dateInfo = {
  name: '春节',
  date: '2022-02-01',
  day: '星期二',
  type: 3,
};
```

### Holidays

Holidays 类，上述方法都是从 new Holidays 导出的，如果想要修改基础配置，可以使用此类

| 参数    | 说明                                                                                                                                                           | 类型     | 默认值                                                         |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :------------------------------------------------------------- |
| baseUrl | cdn 前缀，如果想要进行更换，请确保更换后的链接(`${baseUrl}/2022.json`) 可以访问，e.g: `https://fastly.jsdelivr.net/gh/NateScarlet/holiday-cn@master/2022.json` | `string` | `https://fastly.jsdelivr.net/gh/NateScarlet/holiday-cn@master` |

## CHANGELOG

[CHANGELOG.md](https://github.com/MrSeaWave/chinese-holidays/blob/main/CHANGELOG.md)

## TODOLIST

- [ ] 增加手动更新缓存的功能
- [ ] 提供离线模式

## Contributing

如何贡献代码查看 [CONTRIBUTING](https://github.com/MrSeaWave/chinese-holidays/blob/main/CONTRIBUTING.md)
