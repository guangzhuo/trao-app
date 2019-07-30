import Taro from '@tarojs/taro'

var flyType = null
if(process.env.TARO_ENV === 'h5') {
   flyType = require('flyio/dist/npm/fly')
} else if (process.env.TARO_ENV === 'weapp') {
  flyType = require('flyio/dist/npm/fly')
}
const fly = new flyType();
// fly.config.baseURL = 'http://192.168.31.74:10021'
//添加请求拦截器
fly.interceptors.request.use((request)=>{
  //给所有请求添加自定义header
  // request.headers['sc-id'] = `web-123`;
  request.headers['scf-source'] = 'AHHX_WEB';
  request.headers['Cache-Control'] = 'no-cache';
  request.headers['Accept-Encodingl'] = 'gzip';
  request.headers['Content-Type'] = 'application/json';
  //打印出请求体
  // console.log(request)
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))
  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    const { code } = response.data.code;
    // || code === '794116'
    if (code === '002004' || code === '002005' || code === '002006' || code === '794116') {
      // window.location.href = `/login?backURL=${location.href}`;
      Taro.redirectTo({
        url: `/pages/test/index?backURL=${location.href}`
      })
    }
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    console.log(err)
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
)

export default fly
