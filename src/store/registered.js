import Taro from '@tarojs/taro';
import { observable, action } from 'mobx'
import pathval from 'pathval';
import { Mobile, passFormat } from '@/utils/common'
import { register } from '@/http/apis'
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';


class registeredStore {
  @observable registered = {
    eyeOne: false,
    eysTwo: false,
    phone: '',
    phoneCaptcha: '',
    newPassword: '',
    repeatNewPassword: ''
  }


  @action.bound setEye(type) {
    if(type === 'newPassword') {
      this.retrieve.eyeOne = !this.retrieve.eyeOne
      console.log(this.retrieve.eyeOne)
    } else {
      this.retrieve.eysTwo = !this.retrieve.eysTwo
    }
  }
  @action.bound backURL() {
    const backURL = location.href.split('backURL=')[1];
    if (backURL) {
      Taro.redirectTo({
        url: backURL
      });
    } else {
      Taro.redirectTo({
        url: '/pages/product/index'
      });
    }
  }

  @action.bound captChaChange(value) {
    this.registered.phoneCaptcha = value
  }


  @action.bound okBtn() {
    const newPassword = this.registered.newPassword
    const repeatNewPassword = this.registered.repeatNewPassword
    if(!Mobile(this.registered.phone)) return false
    if(!this.registered.phoneCaptcha){
      Taro.showToast({
        icon: 'none',
        title: '短信验证码不能为空'
      });
      return false
    }
    if(!passFormat(this.registered.newPassword)) return false
    if(!passFormat(this.registered.repeatNewPassword)) return false
    if(newPassword !== repeatNewPassword) {
      Taro.showToast({
        icon: 'none',
        title: '两次输入的密码不一致'
      });
      return false
    }
    const params = {
      'password': encHex.stringify(md5(this.registered.repeatNewPassword)),
      'phone': this.registered.phone,
      'phoneCaptcha': this.registered.phoneCaptcha
    }
    register(params)
      .then(paramsData => {
        console.log(paramsData)
        this.backURL()
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
  @action.bound resetData() {
    this.registered = {
        eyeOne: false,
        eysTwo: false,
        phone: '',
        newPassword: '',
        repeatNewPassword: ''
     }
  }
}
export default new registeredStore()
