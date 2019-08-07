import Taro, {Component} from '@tarojs/taro';
import {Image, View} from '@tarojs/components';
import {AtForm, AtInput, AtButton } from 'taro-ui';
import {inject, observer} from '@tarojs/mobx';
// import Captcha from '@/components/captcha';
import './index.scss';

import login01 from '@/assets/images/login/login-01.png'
import login04 from '@/assets/images/login/login-04.png'

@inject('loginStore')
@observer
class CodePhonelogin extends Component {

  componentDidMount() {
  }

  render() {
    const {
      phoneOne,
      phoneTwo,
      showCaptcha,
      setValue,
      codephoneSubmit,
    } = this.props.loginStore
    return (
      <View className='codePhoneLogin'>
        <AtForm
          className='phoneForm'
        >
          <AtInput
            name='CodePhone'
            title={<Image className='inputImg' src={login01} />}
            type='phone'
            placeholder='请输入手机号'
            value={phoneOne.phone}
            onChange={(value) => { setValue('phoneOne.phone', value) }}
          />
          <AtInput
            name='codePhoneImg'
            title={<Image className='inputImg' src={login04} />}
            type='codePhone'
            placeholder='请输入短信验证码'
            value={phoneTwo.codePhone}
            onChange={(value) => { setValue('phoneTwo.codePhone', value) }}
          >
            <View className='code' onClick={showCaptcha}>{phoneTwo.countDown}</View>
          </AtInput>
          <AtButton
            className='phoneBtn'
            type='primary'
            formType='submit'
            onClick={codephoneSubmit}
          >登录</AtButton>
        </AtForm>

      </View>
    );
  }
}

export default CodePhonelogin;
