import Taro, {Component} from '@tarojs/taro';
import {Image, View} from '@tarojs/components';
import {AtInput, AtModal} from 'taro-ui';
// import {inject, observer} from '@tarojs/mobx';
import {captcha, weCaptcha} from '@/http/apis';
import { Mobile } from '@/utils/common'
import pathval from 'pathval';
// import {action} from 'mobx';

import login03 from '@/assets/images/login/login-03.png'
import login04 from '@/assets/images/login/login-04.png'
import './index.scss';

let timer = null

//
// @inject('captchaStore')
// @observer
class Captcha extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      captcha: {
        phone: '',
        captchaUid: '',
        captchaImg: '',
        isOpened: false,
        inputCapCode: '',
        capCode: '',
        timer: null,
        countDownNum: 60,
        countDown: '获取验证码',
      }
    };
    this.getCaptcha = this.getCaptcha.bind(this)
    this.openModel = this.openModel.bind(this)
    this.captchaClose = this.captchaClose.bind(this)
    this.captchaConfirm = this.captchaConfirm.bind(this)
    this.setValue = this.setValue.bind(this)
    this.countdownInterval = this.countdownInterval.bind(this)
    this.CapCodeChange = this.CapCodeChange.bind(this)
  }
  // 图形验证码
  getCaptcha() {
    captcha()
      .then(capData => {
        const {captchaBase64, key} = capData.data.data;
        this.setState({
          captcha:{
            ...this.state.captcha,
            'captchaUid': key,
            'captchaImg': `data:image/png;base64,${captchaBase64}`
          }
        })
      })
      .catch(error => {
        const { message } = error.response.data
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }
  // 显示图形验证码
  openModel(phone) {
    this.setState({
      captcha:{
        ...this.state.captcha,
        'phone': phone
      }
    }, () => {
      if(Mobile(phone)) {
        this.getCaptcha()
        this.setState({
          captcha:{
            ...this.state.captcha,
            'isOpened': true
          }
        })
      }
    })

  }
  // 关闭图形弹窗
  captchaClose() {
    this.setState({
      captcha:{
        ...this.state.captcha,
        'isOpened': false
      }
    })
  }
  // 倒计时
  countdownInterval() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (this.state.captcha.countDownNum <= 0) {
        clearInterval(timer);
        // this.phoneTwo.countDown = this.defaultTime;
        this.setState({
          captcha:{
            ...this.state.captcha,
            countDownNum: 60,
            countDown: '获取验证码'
          }
        })
        localStorage.removeItem(`time${this.props.key}`)
      } else {
        let thatCountDownNum = localStorage.getItem(`time${this.props.key}`) || this.state.captcha.countDownNum
        this.setState({
          captcha:{
            ...this.state.captcha,
            countDown: `${--thatCountDownNum}s`,
          }
        }, () => {
          localStorage.setItem(`time${this.props.key}`, thatCountDownNum)
          this.setState({
            captcha:{
              ...this.state.captcha,
              countDownNum: thatCountDownNum,
            }
          })
        })
      }
    }, 1000);
  };
  // 确认图形弹窗
  captchaConfirm() {
    if(!this.state.captcha.capCode) {
      Taro.showToast({
        icon: 'none',
        title: '请输入验证码'
      });
      return false;
    }
    const {captchaUid, capCode, phone} = this.state.captcha
    const params = {
      'captchaType':'CAPTCHA_TYPE_FIND_PASSWORD',
      'captchaUid': captchaUid,
      'phone': phone,
      'pictureCaptcha': capCode,
      'timeExpire': 'TIME_MINUTE_1'
    }
    weCaptcha(params)
      .then(wechatData => {
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
  // 回调拿到code
  CapCodeChange(value) {
    this.setValue('state.captcha.inputCapCode', value)
    this.props.onChange(value)
  }

  setValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  componentWillMount() {
    // if (localStorage.getItem(`time${this.props.key}`)) {
    //   this.countdownInterval()
    // }
  }

  componentDidMount() {
  }
  componentWillUnmount() {
    this.setState({
      captcha: {
        phone: '',
        captchaUid: '',
        captchaImg: '',
        isOpened: false,
        inputCapCode: '',
        capCode: '',
        timer: null,
        countDownNum: 60,
        countDown: '获取验证码',
      }
    })
  }

  render() {
    return (
      <View className='captchaWrap'>
        <AtInput
          name={`codeInput${this.props.key}`}
          title={<Image className='inputImg' src={login04} />}
          type='codeInput'
          placeholder='请输入短信验证码'
          value={this.state.captcha.inputCapCode}
          onChange={(value) => { this.CapCodeChange(value) }}
        >
          <View
            className='code'
            onClick={()=> this.openModel(this.props.phone)}
          >{this.state.captcha.countDown}</View>
        </AtInput>
        <AtModal
          isOpened={this.state.captcha.isOpened}
          title='输入图形验证码'
          cancelText='取消'
          confirmText='确认'
          onClose={this.captchaClose}
          onCancel={this.captchaClose}
          onConfirm={this.captchaConfirm}
          content={
            <AtInput
              name={`capCodeInput${this.props.key}`}
              title={<Image className='inputImg' src={login03} />}
              type='text'
              placeholder='验证码'
              value={this.state.captcha.capCode}
              onChange={(value) => { this.setValue('state.captcha.capCode', value) }}
            >
            <Image src={this.state.captcha.captchaImg} onClick={this.getCaptcha} />
          </AtInput>}
        />
      </View>
    );
  }
}
Captcha.defaultProps = {
  phone:'',
  key: '',
  onChange: () => {}
}


export default Captcha;
