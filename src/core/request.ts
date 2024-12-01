// import axios from 'axios';

// import { BASE_URL } from './config';

// const request = (url: string, data: any, method = 'get') => {
//   const requestUrl = BASE_URL + url;
//   const options: any = {
//     method,
//     url: requestUrl,
//   };
//   if (method !== 'get') {
//     options.data = data;
//   } else {
//     options.params = data;
//   }
//   return axios(options).then((resp) => ({ success: true, data: resp.data }));
// };

// /**
//  * @deprecated 不再使用
//  * @param param0
//  * @returns
//  */
// export const getMethod = ({ url, data }: { url: string; data?: any }) => request(url, data, 'get');
