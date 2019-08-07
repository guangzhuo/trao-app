import Taro from '@tarojs/taro';
import { isMobile, isIdentificationNumber, isPwdFormat }  from '@/utils/validator';

export function Mobile(value, msg='手机号码不正确') {
  if(isMobile(value)) {
    Taro.showToast({
      icon: 'none',
      title: msg
    });
    return false
  }
  return true
}

export function Identification(value, msg= '请输入正确格式的纳税识别号') {
  if(isIdentificationNumber(value)) {
    Taro.showToast({
      icon: 'none',
      title: msg
    });
    return false
  }
  return true
}

export function passFormat(value, msg= '必须是包含字母和数字的8-20位密码') {
  if(isPwdFormat(value)) {
    Taro.showToast({
      icon: 'none',
      title: msg
    });
    return false
  }
  return true
}
