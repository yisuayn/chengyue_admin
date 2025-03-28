import cluster from 'cluster';
import { getServerConfig } from './configs/config.default';
import { createServer } from './server';
import logger from './lib/logger';

getServerConfig().then((config) => {
    const runningCPUs = config.runningCPUs || 1;
    setupServerLaunch(runningCPUs);
}).catch((err) => { logger.error('服务器启动失败: ', err); });


function setupServerLaunch(runningCPUs: number) {
    const numCPUs = runningCPUs;

    if (cluster.isPrimary) {
        logger.info('Master process is running');

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            if (code === 0) {
                logger.info(`Worker ${worker.process.pid} exited successfully.`);
            } else {
                logger.error(`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}.`);
            }
        });
    } else {
        createServer();
    }
}
