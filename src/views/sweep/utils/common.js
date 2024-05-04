/**
* 显示消息提示框
* @param content 提示的标题
*/
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

/**
* 显示模态弹窗
* @param content 提示的标题
*/
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

/** 时间格式转换
 * @param e 要转换的日期(如：Sat Nov 26 2022 21:37:29 GMT+0800 (中国标准时间))
 * @returns {string} 转换结果(如：2022-11-26 21:37:29)
 */
export function timeFormatConvert(e, type) {
  const Y = e.getFullYear(); // 年
  const M = prefixZero(e.getMonth() + 1); // 月
  const D = prefixZero(e.getDate()); // 日
  const H = prefixZero(e.getHours()); // 时
  const Mi = prefixZero(e.getMinutes()); // 分
  const S = prefixZero(e.getSeconds()); // 秒
  if(type === 'date'){
	  return Y + "-" + M + "-" + D;
  }
  return Y + "-" + M + "-" + D + " " + H + ":" + Mi + ":" + S;
}

function prefixZero(num = 0, n = 2) {
  // 数字位数不够，数字前面补零
  return (Array(n).join("0") + num).slice(-n);
}