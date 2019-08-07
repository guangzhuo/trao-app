import Taro from '@tarojs/taro';
import { observable, action } from 'mobx'
import { pwdRetrieve } from '@/http/apis'
import pathval from 'pathval';
import { Mobile, passFormat } from '@/utils/common'
import captchaStore from './captcha'
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';

class retrieveStore {
  @observable retrieve = {
    eyeOne: false,
    eysTwo: false,
    phone: '',
    phoneCaptcha: '',
    newPassword: '',
    repeatNewPassword: ''
  }

  // 密码眼睛打开与关闭
  @action.bound setEye(type) {
    if(type === 'newPassword') {
      this.retrieve.eyeOne = !this.retrieve.eyeOne
      console.log(this.retrieve.eyeOne)
    } else {
      this.retrieve.eysTwo = !this.retrieve.eysTwo
    }
  }

  // 短信验证码回调
  @action.bound capchaChange(value){
   this.retrieve.phoneCaptcha = value
  }

  // 找回密码
  @action.bound okBtn() {
    const newPassword = this.retrieve.newPassword
    const repeatNewPassword = this.retrieve.repeatNewPassword
    if(!Mobile(this.retrieve.phone)) return false
    if(!this.retrieve.phoneCaptcha){
      Taro.showToast({
        icon: 'none',
        title: '短信验证码不能为空'
      });
      return false
    }
    if(!passFormat(this.retrieve.newPassword)) return false
    if(!passFormat(this.retrieve.repeatNewPassword)) return false
    if(newPassword !== repeatNewPassword) {
      Taro.showToast({
        icon: 'none',
        title: '两次输入的密码不一致'
      });
      return false
    }
    const params = {
      'password': encHex.stringify(md5(this.retrieve.repeatNewPassword)),
      'phone': this.retrieve.phone,
      'phoneCaptcha': this.retrieve.phoneCaptcha
    }
    pwdRetrieve(params)
      .then(trieveData => {
      console.log(trieveData)
        Taro.navigateTo({
          url: '/pages/login/index'
        })
    })
      .catch(error => {
        const {message} = error.response.data
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }



  @action.bound
  setValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
}
export default new retrieveStore()
