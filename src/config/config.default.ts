import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;
interface HttpProxyConfig {
  // 匹配要代理的 URL 正则表达式
  match: RegExp;
  // 替换匹配到的链接的 host，将请求代理到此地址
  host?: string;
  // 通过正则的表达式捕获组处理代理地址
  target?: string;
  // 转发请求超时时间，默认为0不设置超时时间
  proxyTimeout?: number;
  // 忽略代理请求转发的 header 中的字段
  ignoreHeaders?: {
    [key: string]: boolean;
  };
}
interface HttpProxyType {
  httpProxy: HttpProxyConfig;
}
export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig & HttpProxyType;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1727189661141_1129';
  // add your config here
  config.middleware = [];
  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };
  config.security = {
    csrf: false,
  };
  return {
    ...config,
    cors: {
      origin: '*', // 允许哪个地址跨域请求
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 允许哪些方法跨域请求
      credentials: true, // 允许前端携带cookie
    },
  };
};
