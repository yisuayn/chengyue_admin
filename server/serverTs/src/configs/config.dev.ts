interface AppConfig {
    env?: string;
    port?: number;
    short_hosts?: Record<string, string>;
    index_urls?: Record<string, string>;
    sso_api_id?: string;
    sso_app_key?: string;
    sso_app_secret?: string;
    app_token_expire?: number;
  }
  
import CONFIG from './config.default';
const config: AppConfig = CONFIG;

  
// 环境
config.env = 'development';
config.port = parseInt(process.env.APP_PORT || '', 10) || config.port;
config.short_hosts = JSON.parse(process.env.APP_URL_PREFIX || '{}');
config.index_urls = JSON.parse(process.env.INDEX_URL || '{}');
  
// SSO
config.sso_api_id = process.env.APP_SSO_APP_ID || '';
config.sso_app_key = process.env.APP_SSO_APP_KEY || '';
config.sso_app_secret = process.env.APP_SSO_APP_SECRET || '';
  
// TOKEN 有效期（一个月）
config.app_token_expire = 86400 * 30;
  
export default config;
  