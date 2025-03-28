export class ResHttpError extends Error {
    status: number;
    constructor(public statusText: string, public message: string, ) {
        super(message);
        this.status = this.getStatusCode(statusText);
        this.name = statusText;
    }

    private getStatusCode(statusText: string): number {
        const statusCodes: { [key: string]: number } = {
            'BadRequest' : 400,
            'Unauthorized' : 401,
            'Forbidden' : 403,
            'NotFound' : 404,
            'InternalServerError' : 500,
            // 添加其他需要的映射
        };
        return statusCodes[statusText] || 500;
    }
}
  