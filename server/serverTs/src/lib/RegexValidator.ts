'use strict';

// 定义正则表达式常量，以便重用和增加代码可读性
const MOBILE_PHONE_REGEX = /^1[3|4|5|7|8]\d{9}$/;
const ID_CARD_REGEX_ONE = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
const ID_CARD_REGEX_TWO = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
const IP_REGEX = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;

// 导出 Validator 对象，其中包含各种验证函数
const Validator = {
    // 验证手机号码格式是否有效
    isValidMobilePhoneNumber(mobilePhoneNumber: string): boolean {
        return MOBILE_PHONE_REGEX.test(mobilePhoneNumber);
    },

    // 验证身份证号码格式是否有效（两种格式）
    isValidIDCardNo(idCardNo: string): boolean {
        return ID_CARD_REGEX_ONE.test(idCardNo) || ID_CARD_REGEX_TWO.test(idCardNo);
    },

    // 验证 IP 地址格式是否有效
    isValidIP(ip: string): boolean {
        return IP_REGEX.test(ip);
    },

    // 检查给定的 IP 地址是否与 IPList 中的任何 IP 匹配
    isMatchIP(ip: string, IPList: RegExp[]): boolean {
        for (const allowIP of IPList) {
            if (allowIP.test(ip)) {
                return true; // 在 IPList 中找到匹配的 IP
            }
        }
        return false; // 在 IPList 中未找到匹配的 IP
    },
};

export default Validator;
