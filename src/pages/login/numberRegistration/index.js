import Taro, {Component} from '@tarojs/taro';
import {Image, View} from '@tarojs/components';
import {AtButton, AtForm, AtInput} from 'taro-ui';
import {inject, observer} from '@tarojs/mobx';
import './index.scss';

import login01 from '@/assets/images/login/login-01.png'
import login02 from '@/assets/images/login/login-02.png'
import login03 from '@/assets/images/login/login-03.png'


@inject('loginStore')
@observer
class NumberRegistration extends Component {

  componentDidMount() {
  }

  render() {
    const {
      phoneThree,
      setValue,
      CaptchaImg,
      getCaptcha,
      taxSubmit
    } = this.props.loginStore
    return (
      <View className='NumberRegistrationWrap'>
        <AtForm
          className='phoneForm'
        >
          <AtInput
            name='tax'
            title={<Image className='inputImg' src={login01} />}
            type='text'
            placeholder='请输入纳税人识别号'
            value={phoneThree.tax}
            onChange={(value) => { setValue('phoneThree.tax', value) }}
          />
          <AtInput
            name='taxPassword'
            title={<Image className='inputImg' src={login02} />}
            type='password'
            placeholder='请输入密码'
            value={phoneThree.taxPassword}
            onChange={(value) => { setValue('phoneThree.taxPassword', value) }}
          />
          <AtInput
            name='taxCode'
            title={<Image className='inputImg' src={login03} />}
            type='text'
            placeholder='验证码'
            value={phoneThree.taxCapCode}
            onChange={(value) => { setValue('phoneThree.taxCapCode', value) }}
          >
            <Image src={CaptchaImg} onClick={getCaptcha} />
          </AtInput>
          <AtButton
            className='phoneBtn'
            type='primary'
            formType='submit'
            onClick={taxSubmit}
          >登录</AtButton>
        </AtForm>
      </View>
    );
  }
}

export default NumberRegistration;
