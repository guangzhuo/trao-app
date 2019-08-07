import Taro, {PureComponent} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtTabs, AtTabsPane} from 'taro-ui';
import { observer, inject } from '@tarojs/mobx';
import Phonelogin from './phoneLogin';
import CodePhonelogin from './codePhonelogin';
import NumberRegistration from './numberRegistration';
import Captcha from './captcha';

// import { toJS } from 'mobx'

import './index.scss'

@inject('loginStore')
@observer
class Login extends PureComponent {

  componentDidMount() {

  }

  componentWillUnmount () {
    const { resetData } = this.props.loginStore;
    resetData()
  }


  goNavigetor = (type) => {
    if(type === 'pass'){
      Taro.navigateTo({
        url: '/pages/retrievePassword/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/registered/index'
      })
    }

  }

  render() {
    const { current, setCurrent, phoneType, phoneTypeText, toggleLogin,
      // phoneTwo
    } = this.props.loginStore
    const tabList = [{ title: '手机号登录' }, { title: '税号登录' }]
    return (
      <View className='login-hx'>
        <AtTabs className='tabWrap' current={current} tabList={tabList} onClick={setCurrent}>
          <AtTabsPane current={current} index={0}>
            <View style={{display: `${phoneType === '1' ? 'block': 'none'}`}}>
              <Phonelogin />
            </View>
            <View style={{display: `${phoneType === '1' ? 'none': 'block'}`}}>
              <CodePhonelogin />
            </View>
            <View className='captchaLogin' onClick={toggleLogin}>{ phoneTypeText }</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <NumberRegistration />
          </AtTabsPane>
        </AtTabs>
        <View className='footer'>
          <View onClick={this.goNavigetor.bind(this, 'pass')}>找回密码</View>
          <View className='line'></View>
          <View onClick={this.goNavigetor.bind(this, 'regist')}>注册账号</View>
        </View>
        <Captcha></Captcha>
      </View>
    );
  }
}

export default Login;
