import Taro, {Component} from '@tarojs/taro';
import {Image, View} from '@tarojs/components';
import {
  // AtForm,
  AtInput, AtModal} from 'taro-ui';
import {inject, observer} from '@tarojs/mobx';
import login03 from '@/assets/images/login/login-03.png'
import './index.scss';

@inject('loginStore')
@observer
class Captcha extends Component {

  componentDidMount() {
  }
  
  render() {
    const {
      phoneTwo,
      setValue,
      CaptchaImg,
      captchaClose,
      captchaConfirm,
      getCaptcha
    } = this.props.loginStore
    return (
      <View className='captchaWrap'>
        <AtModal
          isOpened={phoneTwo.isOpened}
          title='输入图形验证码'
          cancelText='取消'
          confirmText='确认'
          onClose={captchaClose}
          onCancel={captchaClose}
          onConfirm={captchaConfirm}
          content={
            <AtInput
              title={<Image className='inputImg' src={login03} />}
              type='text'
              placeholder='验证码'
              value={phoneTwo.capCode}
              onChange={(value) => { setValue('phoneOne.capCode', value) }}
            >
            <Image src={CaptchaImg} onClick={getCaptcha} />
          </AtInput>}
        />
      </View>
    );
  }
}

export default Captcha;
