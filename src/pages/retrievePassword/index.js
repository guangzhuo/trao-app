import Taro, {Component} from '@tarojs/taro';
import {Image, View} from '@tarojs/components';
import {inject, observer} from '@tarojs/mobx';
import {AtButton, AtForm, AtInput} from 'taro-ui';
import Captcha from '@/components/captcha';

import './index.scss';

import login01 from '@/assets/images/login/login-01.png'
import login02 from '@/assets/images/login/login-02.png'
import eyeClose from '@/assets/images/retrievePassword/eye-close.png';
import eyeOpen from '@/assets/images/retrievePassword/eye-open.png';
// import login03 from '@/assets/images/login/login-03.png'


@inject('retrieveStore')
@observer
class RetrievePassword extends Component {

  componentDidMount() {
    // const {isOpened} = this.props.retrieveStore
    // console.log(isOpened)
  }

  render() {
    const { retrieve, setValue, setEye, okBtn, capchaChange } = this.props.retrieveStore
    return (
      <View className='retrievePasswordWrap'>
        <View className='retrTitle'>找回密码</View>
        <AtForm
          className='phoneForm'
        >
          <AtInput
            name='retrievePhone'
            title={<Image className='inputImg' src={login01} />}
            type='phone'
            placeholder='请输入手机号'
            value={retrieve.phone}
            onChange={(value) => { setValue('retrieve.phone', value) }}
          />
          <Captcha phone={retrieve.phone} onChange={capchaChange} />
          <AtInput
            name='newPassword'
            title={<Image className='inputImg' src={login02} />}
            type={`${retrieve.eyeOne ? 'text': 'password'}`}
            placeholder='请输入新密码'
            value={retrieve.newPassword}
            onChange={(value) => { setValue('retrieve.newPassword', value) }}
          >
            <Image className='eyeImg' src={`${retrieve.eyeOne ? eyeOpen:eyeClose}`} onClick={()=>{setEye('newPassword')}}></Image>
          </AtInput>
          <AtInput
            name='repeatNewPassword'
            title={<Image className='inputImg' src={login02} />}
            type={`${retrieve.eysTwo ? 'text': 'password'}`}
            placeholder='请重复输入新密码'
            value={retrieve.repeatNewPassword}
            onChange={(value) => { setValue('retrieve.repeatNewPassword', value) }}
          >
            <Image className='eyeImg' src={`${retrieve.eysTwo ? eyeOpen:eyeClose}`} onClick={()=>{setEye('repeatNewPassword')}}></Image>
          </AtInput>
          <AtButton
            className='phoneBtn'
            type='primary'
            formType='submit'
            onClick={okBtn}
          >确定</AtButton>
        </AtForm>
      </View>
    );
  }
}

export default RetrievePassword;
