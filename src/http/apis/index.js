import fly from '@/http/fly'
// 图形XX
export const captcha = () => {
  return fly.post('/api/graphic')
};
// 手机号登录
export const phoneLogin = (params) => {
  return fly.post('/api/login/passwd', params)
}

// 用户信息
export const userInfo = () => {
  return fly.get('/api/user/info')
}

// 验证码登录
export const codeLogin = (params) => {
  return fly.post('/api//loginregister/phone', params)
}

// 短信发送
export const weCaptcha = (params) => {
  return fly.post('/api/captcha/phone', params)
}

// 税号登录
export const taxLogin = (params) => {
  return fly.post('/api/login/tax', params)
}
// 找回密码
export const pwdRetrieve = (params) => {
  return fly.put('/api/pwdRetrieve', params)
}

// 注册账号
export const register = (params) => {
  return fly.post('/api/register', params)
}

// 自动注册
export const autoRegister = (params) => {
  return fly.post('/api/auto/register', params)
}
