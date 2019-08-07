import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text} from '@tarojs/components';
import {inject, observer} from '@tarojs/mobx';
import {AtButton, AtForm, AtInput} from 'taro-ui';
import Captcha from '@/components/captcha';
import login01 from '@/assets/images/login/login-01.png'
import login02 from '@/assets/images/login/login-02.png'

import './index.scss';

@inject('registeredStore')
@observer
class Registered extends Component {

  componentDidMount() {
  }
  componentWillUnmount() {
    const { resetData } = this.props.registeredStore
    resetData()
  }

  phoneDom = () => {
    return (
      <View className='leftregPhone'>
        <Image className='inputImg' src={login01} />
        <View className='phoneNumber'>+86</View>
      </View>
    )
  }
  goAutoRegister = () => {
    Taro.navigateTo({
      url: `/pages/autoRegister/index`
    })
  }

  render() {
    const {registered, setValue, okBtn, captChaChange} = this.props.registeredStore
    return (
      <View className='RegisteredWrap'>
        <View className='retrTitle'>注册</View>
        <AtForm
          className='phoneForm'
        >
          <AtInput
            className='regPhone'
            name='value'
            title={this.phoneDom()}
            type='phone'
            placeholder='请输入手机号'
            value={registered.phone}
            onChange={(value) => { setValue('registered.phone', value) }}
          />
          <Captcha phone={registered.phone} onChange={captChaChange} />
          <AtInput
            name='newPassword'
            title={<Image className='inputImg' src={login02} />}
            type='password'
            placeholder='请输入新密码'
            value={registered.newPassword}
            onChange={(value) => { setValue('registered.newPassword', value) }}
          />
          <AtInput
            name='repeatNewPassword'
            title={<Image className='inputImg' src={login02} />}
            type='password'
            placeholder='请重复输入新密码'
            value={registered.repeatNewPassword}
            onChange={(value) => { setValue('registered.repeatNewPassword', value) }}
          />
          <AtButton
            className='phoneBtn'
            type='primary'
            formType='submit'
            onClick={okBtn}
          >注册</AtButton>
        </AtForm>
        <View className='regProtocol'>
          点击"注册"按钮，即表示您已同意<Text className='Protocol' onClick={this.goAutoRegister}>《XXXX注册协议》</Text>
        </View>
      </View>
    );
  }
}

export default Registered;
