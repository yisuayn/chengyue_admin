import request from "@/utils/request";

export function getCaptcha() {
  return request({
    url: "/auth/captcha",
    method: "get",
  });
}

// 模拟实现
export function mockGetCaptcha() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase();
      const captchaImage = `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0,0,100,40">
          <rect width="100" height="40" fill="#f5f5f5"/>
          <text x="50" y="25" font-family="Arial" font-size="20" text-anchor="middle" 
                fill="#333" transform="rotate(${Math.random() * 10 - 5},50,25)">
            ${randomStr}
          </text>
          <line x1="${Math.random() * 30}" y1="${Math.random() * 40}" 
                x2="${70 + Math.random() * 30}" y2="${Math.random() * 40}" 
                stroke="#ccc" stroke-width="1"/>
          <line x1="${Math.random() * 30}" y1="${Math.random() * 40}" 
                x2="${70 + Math.random() * 30}" y2="${Math.random() * 40}" 
                stroke="#ccc" stroke-width="1"/>
        </svg>
      `)}`;

      resolve({
        data: {
          captchaImage,
          captchaKey: Date.now().toString(),
        },
      });
    }, 200);
  });
}

// 实际项目中用上面的getCaptcha，开发时可以用mockGetCaptcha
export default mockGetCaptcha;
