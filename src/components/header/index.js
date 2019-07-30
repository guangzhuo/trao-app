import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtProgress, AtIcon   } from 'taro-ui'
import {test} from '@/http/apis'

class Header extends Component {

  componentDidMount() {
    test().then(data => {
      console.log(data)
    })
  }

  render() {
    return (
      <View>
        <AtButton type='primary'>按钮文案</AtButton>
        <AtProgress percent={25} />
        <AtIcon value='clock' size='30' color='#F00'></AtIcon>
      </View>
    );
  }
}

export default Header;
