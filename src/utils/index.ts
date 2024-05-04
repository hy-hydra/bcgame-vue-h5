import Fingerprint2 from "fingerprintjs2";
import { BROWSERID_KEY } from "@/utils/request";
import { localStorage } from "@/utils/local-storage";
import { useRegister } from "@/stores/userRegister.pinia";

export const checkPasswordStrength = password => {
  // 正则表达式条件
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  const minLength = 8;

  // 判断密码强度
  if (
    lowercaseRegex.test(password) &&
    uppercaseRegex.test(password) &&
    digitRegex.test(password) &&
    specialCharRegex.test(password) &&
    password.length >= minLength
  ) {
    return "Secure";
  } else if (password.length >= minLength) {
    return "Moderate";
  } else {
    return "Vulnerable";
  }
};
export function isPromise(value: any): value is Promise<any> {
  return value instanceof Promise;
}

/**
 * 获取浏览器信息
 * 异步函数
 */
// export function getFingerprint() {
//   // 浏览器指纹
//   const fingerprint = Fingerprint2.get((components) => { // 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
//       const values = components.map(component => component.value); // 配置的值的数组
//       const finger = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
//       localStorage.set(BROWSERID_KEY, finger); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
//   });
// }

export async function getFingerprint() {
  const StoreRegister = useRegister();

  // 浏览器指纹
  await Fingerprint2.get(components => {
    // 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
    const values = components.map(component => component.value); // 配置的值的数组
    const finger = Fingerprint2.x64hash128(values.join(""), 31); // 生成浏览器指纹
    StoreRegister.setDeviceId(finger);
    localStorage.set(BROWSERID_KEY, finger);
    //  localStorage.setItem('browserId', finger);
  });
}

export function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(this: any) {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}


export function objectToQueryString(obj) {
  // 使用encodeURIComponent对键和值进行编码，确保URL的特殊字符被正确处理
  const queryString = Object.keys(obj).map(key => 
      `${key}=${obj[key]}`
  ).join('&'); // 将所有键值对使用 & 连接起来形成查询字符串

  return queryString;
}