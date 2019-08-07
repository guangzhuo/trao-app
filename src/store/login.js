import Taro from '@tarojs/taro';
import { observable, action } from 'mobx'
import pathval from 'pathval';
import { captcha, phoneLogin, codeLogin, weCaptcha,taxLogin } from '@/http/apis'
import { Mobile, Identification } from '@/utils/common'
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import common from './common';

class loginStore {
  @observable current = 0
  @observable phoneType = '1' // 手机号还是短信验证码
  @observable CaptchaImg = '' //
  @observable captchaUid = '' // 验证码key
  @observable phoneTypeText = '用短信验证码登录'
  @observable phoneOne = {
    phone:'',
    phonePassword:'',
    capCode:'',
  }
  @observable phoneTwo = {
    codePhone: '',
    capCode: '',
    isOpened: false,
    countDown: '短信验证码',
    countDownNum: 60,
    timer: null
  }
  @observable phoneThree = {
    tax: '',
    taxPassword: '',
    taxCapCode: ''
  }

  // @observable isOpened = false
  // @observable toastText = '错误'
  // @observable toastIcon = 'error'


  @action.bound setCurrent(current) {
    this.getCaptcha()
    this.current = current
  }
  @action.bound backURL() {
    const backURL = location.href.split('backURL=')[1]
    if (backURL) {
      Taro.redirectTo({
        url: backURL
      })
    } else {
      Taro.redirectTo({
        url: '/pages/product/index'
      })
    }
  }

  // 图形验证码
  @action.bound getCaptcha() {
    captcha()
      .then(capData => {
      const {captchaBase64, key} = capData.data.data;
      this.captchaUid = key
      this.CaptchaImg = `data:image/png;base64,${captchaBase64}`
    })
      .catch(error => {
        const { message } = error.response.data
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }

  // 手机登录
  @action.bound phoneSubmit() {
    if(!Mobile(this.phoneOne.phone)) return false;
    if(!this.phoneOne.phonePassword){
      Taro.showToast({
        icon: 'none',
        title: '请输入密码'
      });
      return false;
    }
    if(!this.phoneOne.capCode){
      Taro.showToast({
        icon: 'none',
        title: '请输入验证码'
      });
      return false;
    }
    const params = {
      'captchaUid': this.captchaUid,
      'password': encHex.stringify(md5(this.phoneOne.phonePassword)),
      'phone': this.phoneOne.phone,
      'pictureCaptcha': this.phoneOne.capCode
    }
    phoneLogin(params)
      .then(phoneData => {
        localStorage.setItem('sc-token', phoneData.headers['scf-token'])
        // common.setInfo('loginInfo', phoneData.data)
        common.getUserInfo()
        this.backURL()
      })
      .catch(error => {
        this.getCaptcha()
        const {message} = error.response.data
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }
  // 切换
  @action.bound toggleLogin() {
    const phoneType = this.phoneType
    if(phoneType === '1') {
      this.phoneTypeText = '用密码登录'
      this.phoneType = '2'
    } else {
      this.phoneTypeText = '用短信验证码登录'
      this.phoneType = '1'
    }
  }

  // 显示验证码弹窗
  @action.bound showCaptcha() {
    if (Mobile(this.phoneOne.phone)) {
      this.getCaptcha()
      this.phoneTwo.isOpened = true
    } else {
      Taro.showToast({
        icon: 'none',
        title: '请输入正确的手机号'
      });
    }

  }
  // 关闭验证码弹窗
  @action.bound captchaClose () {
    this.phoneTwo.isOpened = false
  }
  // 验证码弹窗确定
  @action.bound captchaConfirm() {
    if(!this.phoneOne.capCode) {
      Taro.showToast({
        icon: 'none',
        title: '请输入验证码'
      });
      return false
    }
    const params = {
      'captchaType':'CAPTCHA_TYPE_LOGIN',
      'captchaUid': this.captchaUid,
      'phone': this.phoneOne.phone,
      'pictureCaptcha': this.phoneOne.capCode,
      'timeExpire': 'TIME_MINUTE_1'
    }
    weCaptcha(params).then(wechatData => {
      console.log(wechatData)
      this.countdownInterval()
      this.captchaClose()
    })
      .catch(error => {
        const {message} = error.response.data
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }
  // 倒计时
  @action.bound countdownInterval = () => {
    this.phoneTwo.timer = setInterval(() => {
      if (this.phoneTwo.countDownNum <= 0) {
        clearInterval(this.phoneTwo.timer);
        // this.phoneTwo.countDown = this.defaultTime;
        this.phoneTwo.countDownNum = 60;
        this.phoneTwo.countDown = '获取验证码'
      } else {
        this.phoneTwo.countDown = `${--this.phoneTwo.countDownNum}s`
      }
    }, 1000);
  };
  // 短信登录
  @action.bound codephoneSubmit() {
    if (!Mobile(this.phoneOne.phone)) return false
    if (!this.phoneTwo.codePhone) {
      Taro.showToast({
        icon: 'none',
        title: '请输入短信验证码'
      });
      return false;
    }
    const params = {
      phone: this.phoneOne.phone,
      code: this.phoneTwo.codePhone
    }
    codeLogin(params)
      .then(codeData => {
        const { registerCode } = codeData.data.data
        if (registerCode) {
          Taro.redirectTo({
            url: `/pages/autoRegister/index?captcha=${registerCode}&phone=${this.phoneOne.phone}`
          })
        } else {
          this.backURL()
        }
      })
      .catch(error => {
        const {message} = error.response.data
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }


  // 税号登录
  @action.bound taxSubmit() {
    const iden = Identification(this.phoneThree.tax);
    if(!iden) return false;
    if(!this.phoneThree.taxPassword) {
      Taro.showToast({
        icon: 'none',
        title: '请输入密码'
      });
      return false
    }
    if(!this.phoneThree.taxCapCode) {
      Taro.showToast({
        icon: 'none',
        title: '请输入验证码'
      });
      return false
    }
    const params = {
      'captchaUid': this.captchaUid,
      'password': this.phoneThree.taxPassword,
      'pictureCaptcha': this.phoneThree.taxCapCode,
      'tax': this.phoneThree.tax
    }
    taxLogin(params)
      .then(taxData => {
        console.log(taxData)
        this.backURL()
      })
      .catch(error =>{
        const {message} = error.response.data
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }

  @action.bound setValue(key, value) {
    pathval.setPathValue(this, key, value);
  }

  @action.bound resetData() {
    this.current = 0
    this.phoneType = '1' // 手机号还是短信验证码
    this.CaptchaImg = '' //
    this.captchaUid = '' // 验证码key
    this.phoneTypeText = '用短信验证码登录'
    this.phoneOne = {
        phone:'',
        phonePassword:'',
        capCode:'',
      }
    this.phoneTwo = {
        codePhone: '',
        capCode: '',
        isOpened: false,
        countDown: '短信验证码',
        countDownNum: 60,
        timer: null
      }
    this.phoneThree = {
      tax: '',
      taxPassword: '',
      taxCapCode: ''
    }
  }

}

export default new loginStore()
