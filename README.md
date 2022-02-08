# chinese-holidays

中国法定节假日查询，数据源来自 [holiday-cn](https://github.com/NateScarlet/holiday-cn) , [国家通知](http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm)

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
import { isWorkingDay, isHoliday, isWeekEnd, getDateInfo } from '@swjs/chinese-holidays';

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
  await getDateInfo('2022-01-02');
  // 返回如下数据
  //   {
  //   "name": "春节",
  //   "date": "2022-02-01",
  //   "day": "星期二",
  //   "type": 3
  // }
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

## CHANGELOG

[CHANGELOG.md](https://github.com/MrSeaWave/chinese-holidays/blob/main/CHANGELOG.md)

## TODOLIST

- [ ] 提供离线模式

## Contributing

如何贡献代码查看 [CONTRIBUTING](https://github.com/MrSeaWave/chinese-holidays/blob/main/CONTRIBUTING.md)
