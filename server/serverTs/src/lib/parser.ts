/**
 * 数据解析工具类
 */

import { parse } from 'url';

/**
 * 解析redis连击窜为client
 * @param  {String} str Redis连接窜
 * @return {Object}     client对象
 */
function parseRedisUrl(str: string) {
    const options = { host: '127.0.0.1', password: '', db: 0, port: 6379, path: '' };
    const parsed = parse(str, true, true);
    // [redis:]//[[user][:password]@][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
    if (parsed.slashes) { // We require slashes
        if (parsed.auth) {
            options.password = parsed.auth.split(':')[1];
        }
        if (parsed.protocol && parsed.protocol !== 'redis:') {
            throw new Error('node_redis: WARNING: You passed "' + parsed.protocol.substring(0, parsed.protocol.length - 1) + '" as protocol instead of the "redis" protocol!');
        }
        if (parsed.pathname && parsed.pathname !== '/') {
            options.db = +parsed.pathname.substr(1);
        }
        if (parsed.hostname) {
            options.host = parsed.hostname;
        }
        if (parsed.port) {
            options.port = +parsed.port;
        }
        // if (parsed.search !== '') {
        //     let elem: string;
        //     for (elem in parsed.query) {
        //         // If options are passed twice, only the parsed options will be used
        //         if (elem in options) {
        //             if (options[elem] === parsed.query[elem]) {
        //                 throw new Error('node_redis: WARNING: You passed the ' + elem + ' option twice!');
        //             } else {
        //                 throw new RangeError('The ' + elem + ' option is added twice and does not match');
        //             }
        //         }
        //         options[elem] = parsed.query[elem];
        //     }
        // }
    } else if (parsed.hostname) {
        throw new Error('The redis url must begin with slashes "//" or contain slashes after the redis protocol');
    } else {
        options.path = str;
    }
    return options;
}

export { parseRedisUrl };
