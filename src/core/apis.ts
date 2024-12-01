import axios from 'axios';

type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | { success: false; error: any };

export interface RemoteHolidaysInfoResp {
  $schema: string;
  $id: string;
  year: number;
  papers: string[];
  days: HolidayInfo[];
}

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

export async function getRemoteHolidaysApi(year: string, options: { baseUrl: string }) {
  return axios
    .get(`${options.baseUrl}/${year}.json`)
    .then((resp) => ({ success: true, data: resp.data }))
    .catch((error) => ({ success: false, error })) as Promise<ApiResponse<RemoteHolidaysInfoResp>>;
}
