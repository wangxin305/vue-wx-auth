class wechatAuth {
  constructor(config) {
    let defaultConfig = {
      appid: '',
      responseType: 'code',
      redirect_uri: '',
      error_uri: '',
      scope: 'snsapi_base ',
      getCodeCallback: () => { },
    }
    this.config = Object.assign(defaultConfig, config)
  }

  //调取微信获取code接口
  getCode(path) {
    let authPageBaseUri = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    let authParams = `?appid=${this.config.appid}&redirect_uri=${this.config.redirectUri+path}&response_type=${this.config.responseType}&scope=${this.config.scope}#wechat_redirect`;
    window.location.href = authPageBaseUri + authParams;
  }

  next (next) {
    return (to, code) => {
      if (code) {
        window.sessionStorage.setItem('wxcode', code);
        to? next(to): next();
      } else {
        to && next(to);
      }
    }
  }

  getCodeCallback(next,code,path) {
    return this.config.getCodeCallback(this.next(next),code,path);
  }

}

export default wechatAuth;
