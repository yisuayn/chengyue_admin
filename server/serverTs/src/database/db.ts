import mongoose from 'mongoose';
// import mongodbUri from 'mongodb-uri';
import logger from '../lib/logger';
import { getServerConfig } from '../configs/config.default';

const MAX_RETRIES = 5; // 最大重试次数
const BASE_DELAY = 1000; // 基础延迟时间，以毫秒为单位

export const connectDB = async (retries = MAX_RETRIES, delay = BASE_DELAY) => {
    try {
        const config = await getServerConfig();

        await mongoose.connect(config.mongodb.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error((`MongoDB connection error: ${error}`));
        if (retries === 0) {
            logger.error(('No more retries left'));
            return; // 如果没有重试次数了，退出函数
        }
        logger.info((`Retrying to connect to MongoDB in ${delay}ms`));
        setTimeout(() => connectDB(retries - 1, delay * 2), delay); // 递归调用，次数减一，延迟翻倍
    }
};
