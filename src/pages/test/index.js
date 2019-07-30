import Taro, {Component} from '@tarojs/taro';
import { view } from '@tarojs/components';

class Index extends Component {

  componentDidMount() {
    console.log(this.$router.params)
  }


  render() {
    return (
      <view>
        test
      </view>
    );
  }
}

export default Index;
