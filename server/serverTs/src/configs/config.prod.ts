interface RedisConfig {
    url: string;
    // 可以添加其他 Redis 相关配置项
  }
  
  interface LogConfig {
    level: string;
    // 可以添加其他日志相关配置项
  }
  
  interface AppConfig {
    env: string;
    port: number;
    redis: RedisConfig;
    sso_api_id: string | undefined;
    sso_app_key: string | undefined;
    sso_app_secret: string | undefined;
    loger: LogConfig;
  }
  
const config: AppConfig = require('./config.default');
  
// 环境
config.env = 'production';
// 侦听端口号
config.port = parseInt(process.env.APP_PORT || '', 10) || config.port;
// Redis
config.redis.url = process.env.APP_REDIS_URL || config.redis.url;
// SSO
config.sso_api_id = process.env.APP_SSO_APP_ID || undefined;
config.sso_app_key = process.env.APP_SSO_APP_KEY || undefined;
config.sso_app_secret = process.env.APP_SSO_APP_SECRET || undefined;
// 日志等级
config.loger.level = process.env.NPM_CONFIG_LOGLEVEL || config.loger.level || 'info';
  
export default config;
  