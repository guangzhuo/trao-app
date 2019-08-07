// 校验手机号
function isMobile(value) {
  const mobilePat = /^1[34578]\d{9}$/;
  return !mobilePat.test(value);
}
// 校验推荐码=>４位数字
function isRecomendCode(value) {
  if (!value) return;
  const pat = /^\d{4}$/;
  return !pat.test(value);
}
// 校验推荐码=> 6位数字
function isPhoneCode(value) {
  if (!value) return;
  const pat = /^\d{6}$/;
  return !pat.test(value);
}
// 校验是否为固话或者移动电话号码
// 固话电话号码格式=>3-4位国家区号-3-4位地址区号-7-8位数字
// 移动电话号码格式=>11位数字、只能以13、14、15、17、18开头
function isTelOrMobile(value) {
  if (!value) return;
  const telPat = /^((0\d{2,3}-)?(0\d{2,3}-))?\d{7,8}$/;
  const mobilePat = /^1[34578]\d{9}$/;
  return !telPat.test(value) && !mobilePat.test(value)
}
// 校验是否为正整数
function isPositiveIntNumber(value) {
  const pat = /^\+?[1-9][0-9]*$/;
  return !pat.test(value)
}
// 校验是否为正数
function isPositiveNumber(value) {
  const pat = /^([1-9]+\d*(\.\d+)?|0\.\d+)$/;
  return !pat.test(value)
}
// 校验统一社会信用代码／纳税人识别号格式=>15、18、20位字符
function isIdentificationNumber(value) {
  const pat = /(^\S{15}$)|(^\S{18}$)|(^\S{20}$)/;
  return !pat.test(value)
}
// 校验两个值是否相同
function isSame(value, oldValue) {
  if (value === oldValue) {
    return true;
  }
}
// 校验密码格式=>8-20位数字、大小写英文
function isPwdFormat(value) {
  const pat = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/g; // 校验密码格式=>8-20位数字、大小写英文、特殊字符
  // const pat = /^[a-zA-Z\d]{8,20}$/g; // 校验密码格式=>8-20位数字、大小写英文
  return !pat.test(value)
}
// 校验昵称格式=>2-50位大小写英文、数字、中文
function isNickFormat(value) {
  const pat = /^[A-Za-z\d\u4e00-\u9fa5]{2,50}$/;
  return !pat.test(value)
}
// 校验是否为空
function isEmpty(value) {
  if (value === '') {
    return true;
  }
}

export {
  isMobile,
  isRecomendCode,
  isPhoneCode,
  isTelOrMobile,
  isPositiveIntNumber,
  isPositiveNumber,
  isIdentificationNumber,
  isSame,
  isPwdFormat,
  isNickFormat,
  isEmpty
}
