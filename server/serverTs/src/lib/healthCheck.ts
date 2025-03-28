import mongoose from 'mongoose';
import { ping } from '../database/redis';

class HealthCheck {
    constructor() {
        // 初始化，可以在这里添加其他依赖项
    }

    async checkDatabase() {
        try {
            // 假设使用 Mongoose
            await mongoose.connection.db.admin().ping();
            return { service: 'Database', isHealthy: true };
        } catch (error: any) {
            return { service: 'Database', isHealthy: false, error: error.message };
        }
    }

    async checkRedis() {
        const response = await ping();
        const isHealthy = response === 'PONG';
        if (isHealthy) {
            return { service: 'Redis', isHealthy };
        } else {
            return response;
        }
    }

    // async checkConfigService() {
    //     // 实现依据您的配置服务
    // }

    async performAllChecks() {
        // 并行执行所有检查
        const results = await Promise.all([
            this.checkDatabase(),
            this.checkRedis(),
            // this.checkConfigService()
        ]);

        return results;
    }
}

export { HealthCheck };
