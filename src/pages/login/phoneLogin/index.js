import Taro, {Component} from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import {AtForm, AtInput, AtButton } from 'taro-ui';
import {inject, observer} from '@tarojs/mobx';

import './index.scss';

import login01 from '@/assets/images/login/login-01.png'
import login02 from '@/assets/images/login/login-02.png'
import login03 from '@/assets/images/login/login-03.png'

@inject('loginStore')
@observer
class PhoneLogin extends Component {
  componentDidMount() {
    const { getCaptcha } = this.props.loginStore
    getCaptcha()
  }

  render() {
    const {
      phoneOne,
      setValue,
      CaptchaImg,
      getCaptcha,
      phoneSubmit
    } = this.props.loginStore
    return (
      <View className='phoneLogin'>
        <AtForm
          className='phoneForm'
        >
          <AtInput
            name='phone'
            title={<Image className='inputImg' src={login01} />}
            type='phone'
            placeholder='请输入手机号'
            value={phoneOne.phone}
            onChange={(value) => { setValue('phoneOne.phone', value) }}
          />
          <AtInput
            name='password'
            title={<Image className='inputImg' src={login02} />}
            type='password'
            placeholder='请输入密码'
            value={phoneOne.phonePassword}
            onChange={(value) => { setValue('phoneOne.phonePassword', value) }}
          />
          <AtInput
            name='code'
            title={<Image className='inputImg' src={login03} />}
            type='text'
            placeholder='验证码'
            value={phoneOne.capCode}
            onChange={(value) => { setValue('phoneOne.capCode', value) }}
          >
            <Image src={CaptchaImg} onClick={getCaptcha} />
          </AtInput>
          <AtButton
            className='phoneBtn'
            type='primary'
            formType='submit'
            onClick={phoneSubmit}
          >登录</AtButton>
        </AtForm>
      </View>
    );
  }
}

export default PhoneLogin;
