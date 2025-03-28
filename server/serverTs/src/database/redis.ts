import Redis from 'ioredis';
import { getServerConfig } from '../configs/config.default';
import logger from '../lib/logger';
import { Redis as RedisClient } from 'ioredis';

let redisClient: RedisClient| undefined;
const MAX_ATTEMPTS = 5;
let attempts = 0;

async function initializeRedis() {
    // 尝试断开现有的 Redis 客户端连接
    if (redisClient && redisClient.status === 'ready') {
        logger.info('断开Redis连接');
        await redisClient.quit();
    }
    while (attempts < MAX_ATTEMPTS) {
        try {
            const fullConfig = await getServerConfig();
            const redisConfig = fullConfig.redis.client;
            redisClient = new Redis(redisConfig);
            setupRedisEventListeners(redisClient);
            return;
        } catch (err) {
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 5000)); // 重试前等待
        }
    }
    logger.error('All attempts to initialize Redis have failed');
    if (attempts >= MAX_ATTEMPTS) {
        logger.error('Unable to initialize Redis, shutting down the application');
        process.exit(1);
    }
}

function shouldTriggerExit(err: Error): boolean {
    if (err.message.includes('connect ETIMEDOUT') || err.message.includes('ERR invalid password')) {
        return true;
    }
    return false;
}

function setupRedisEventListeners(redisClient: RedisClient) {
    redisClient.on('error', (err) => { 
        logger.error('Redis Connection Error:', err);
        if (shouldTriggerExit(err)) {
            logger.error('Redis 连接上有非常大的错误, 详细检查配置和网络');
            process.exit(1);
        }
    })
        .on('close', () => logger.debug('Redis Connection Closed'))
        .on('reconnecting', () => logger.debug('Reconnecting to Redis...'))
        .on('connect', () => logger.debug(('Connected to Redis')));
}

/**
 * @description 设置缓存
 * @param {string} sessionId redis Key
 * @param {any} data 存储数据
 * @param {number} expireNum 过期时间
 * @param {string} expiredAt 什么时间过期
 */
const setSession = <T>(sessionId: string, data: T, expireNum?: number, expiredAt?: string): void => {
    if (!redisClient) {
        logger.error('Redis client is not initialized.');
        return;
    }
    
    // Use a pipeline to perform both set and expire as an atomic operation
    const pipeline = redisClient.pipeline();
    
    // Serialize the data to a JSON string for storage
    pipeline.set(sessionId, JSON.stringify(data));
    
    if (expireNum !== undefined) {
        // If expireNum is provided, set the key to expire after expireNum seconds
        pipeline.expire(sessionId, expireNum);
    } else if (expiredAt) {
        // If expiredAt is provided, calculate the expiration in seconds
        const expirationTime = new Date(expiredAt).getTime() - Date.now();
        const expirationInSeconds = Math.max(Math.floor(expirationTime / 1000), 1); // Ensure at least 1 second
        pipeline.expire(sessionId, expirationInSeconds);
    }
    
    // Execute the pipeline commands
    pipeline.exec((err, results) => {
        if (err) {
            logger.error('Error setting session in Redis:', err);
        }
    });
};


const getSession = async (sessionId: string): Promise<string | null> => {
    if (redisClient) {
        try {
            const data = await redisClient.get(sessionId);
            return processString(data) || null;
        } catch (err) {
            throw new Error(`redis get err: ${err}`);
        }
    } else {
        logger.error('Redis client is not initialized.');
        return null;
    }
};

/**
 * @description 将双引号去除，只保留最外层的单引号
 * @param inputStr 
 * @returns 
 */
const processString = (inputStr: string | null): string => {
    if (!inputStr) return '';
    // 使用正则表达式匹配并处理字符串
    const processedStr = inputStr.replace(/^"(.*)"$/, (_, capturedGroup) => {
        // 还原转义字符并返回处理后的内容
        const decodedString = capturedGroup.replace(/\\(.)/g, '$1');
        return decodedString;
    });
    return processedStr;
};

const ping = async () => {
    if (redisClient) {
        try {
            const response = await redisClient.ping();
            return response;
        } catch (err: any) {
            return { service: 'Redis', isHealthy: false, error: err.message };
        }
    } else {
        logger.error('Redis client is not initialized.');
        return { service: 'Redis', isHealthy: false };
    }
};

export { redisClient, initializeRedis, setSession, getSession, ping };