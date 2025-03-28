import moment from 'moment-timezone';

// 定义格式化字符串的默认格式
const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * @description 获取当前时间的Unix时间戳
 * @returns 
 */
const getUnixTimestamp = function (): number {
    return Math.floor(new Date().getTime() / 1000);
};

/**
 * @description 格式化日期对象为指定的字符串格式
 * @param date 
 * @param formatString 
 * @returns 
 */
const format = function(date: Date | string = new Date(), formatString: string = DEFAULT_FORMAT): string {
    // 创建moment对象并将其转换为亚洲/上海（'Asia/Shanghai'）时区的日期对象
    const momentDate = moment(date).tz('Asia/Shanghai');
    // 使用指定的格式化字符串格式化日期对象
    return momentDate.format(formatString);
};

export default { getUnixTimestamp, format };