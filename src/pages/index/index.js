import Taro, { Component } from '@tarojs/taro'
import { View,
  // Text
} from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
// import Header from '@/components/header'

import './index.scss'


@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }
  gotest = () => {
    // window.location.href=`/pages/test/index?id=${1}`
    // Taro.navigateTo({
    //   url: `/pages/test/index?id=${1}`
    // })
    Taro.redirectTo({
      url: `/pages/test/index?id=${1}`
    })
  }

  render () {
    // const { counterStore: { counter } } = this.props
    return (
      <View id='one'>
        {/* <Header></Header>
        <AtButton className={`indexs ${true? 'aa': 'bb'}`} onClick={this.increment}>+</AtButton>
        <AtButton onClick={this.decrement}>-</AtButton>
        <AtButton onClick={this.gotest}>gotest</AtButton>
        <AtButton onClick={this.incrementAsync}>Add Async</AtButton>
        <Text>{counter}</Text>*/}
        home
      </View>
    )
  }
}

export default Index 
