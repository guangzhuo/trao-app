import Taro from '@tarojs/taro';
import { observable, action } from 'mobx'
import pathval from 'pathval';
import { userInfo } from '@/http/apis';

class commonStore {
  @observable loginInfo = {};
  @observable userInfo = {};
  @observable taxInfo = {};

  @action.bound getUserInfo(callback=()=>{}) {
    userInfo()
      .then(userData => {
        const { data } = userData.data;
        this.userInfo = data;
        sessionStorage.setItem('userID',data.id);
        callback(data)
      })
      .catch(error => {
        const {message} = error.response.data;
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }

  /**
   * @desc:
   */
  @action.bound getTaxInfo(){
    getTaxInfo()
      .then(resp => {
        const { data } = resp.data;
        this.taxInfo = data
      })
      .catch(error => {
        const {message} = error.response.data;
        Taro.showToast({
          icon: 'none',
          title: message
        });
      })
  }

  @action.bound setInfo(type, val) {
    this[type] = val
  }
  @action.bound setValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
}
export default new commonStore()
