// import IDValidator from 'id-validator';

export default {
  // 校验是否为空
  isEmpty(value, { msg } = {}) {
    if (value === '') {
      return msg;
    }
  },
  // 校验昵称格式=>2-50位大小写英文、数字、中文
  isNickFormat(value, { msg } = {}) {
    const pat = /^[A-Za-z\d\u4e00-\u9fa5]{2,50}$/;
    if (!pat.test(value)) {
      return msg;
    }
  },
  // 校验密码格式=>8-20位数字、大小写英文
  isPwdFormat(value, { msg } = {}) {
    const pat = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/g; // 校验密码格式=>8-20位数字、大小写英文、特殊字符
    // const pat = /^[a-zA-Z\d]{8,20}$/g; // 校验密码格式=>8-20位数字、大小写英文
    if (!pat.test(value)) {
      return msg;
    }
  },
  // 校验两个值是否相同
  isSame(value, { msg, oldValue } = {}) {
    if (value !== oldValue) {
      return msg;
    }
  },
  // 校验统一社会信用代码／纳税人识别号格式=>15、18、20位字符
  isIdentificationNumber(value, { msg } = {}) {
    const pat = /(^\S{15}$)|(^\S{18}$)|(^\S{20}$)/;
    if (!pat.test(value)) {
      return msg;
    }
  },
  // 用id-validator校验身份证号码格式
  // isIdcard(value, { msg } = {}) {
  //   const Validator = new IDValidator();
  //   if (!Validator.isValid(value)) {
  //     return msg;
  //   }
  // },
  // 校验是否为正数
  isPositiveNumber(value, { msg } = {}) {
    const pat = /^([1-9]+\d*(\.\d+)?|0\.\d+)$/;
    if (!pat.test(value)) {
      return msg;
    }
  },
  // 校验是否为正整数
  isPositiveIntNumber(value, { msg } = {}) {
    const pat = /^\+?[1-9][0-9]*$/;
    if (!pat.test(value)) {
      return msg;
    }
  },
  // 校验是否为固话或者移动电话号码
  // 固话电话号码格式=>3-4位国家区号-3-4位地址区号-7-8位数字
  // 移动电话号码格式=>11位数字、只能以13、14、15、17、18开头
  isTelOrMobile(value, { msg } = {}) {
    if (!value) return;
    const telPat = /^((0\d{2,3}-)?(0\d{2,3}-))?\d{7,8}$/;
    const mobilePat = /^1[34578]\d{9}$/;
    if (!telPat.test(value) && !mobilePat.test(value)) {
      return msg;
    }
  },
  // 校验手机号
  isMobile(value, { msg } = {}) {
    if (!value) return;
    const mobilePat = /^1[34578]\d{9}$/;
    if (!mobilePat.test(value)) {
      return msg;
    }
  },
  // 校验推荐码=> 6位数字
  isPhoneCode(value, { msg } = {}) {
    if (!value) return;
    const pat = /^\d{6}$/;
    if (!pat.test(value)) {
      return msg;
    }
  },
  // 校验推荐码=>４位数字
  isRecomendCode(value, { msg } = {}) {
    if (!value) return;
    const pat = /^\d{4}$/;
    if (!pat.test(value)) {
      return msg;
    }
  },
};
