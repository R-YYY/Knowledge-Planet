import COS from 'cos-js-sdk-v5'

let Bucket = 'covenant-1308013334';  /* 存储桶，必须字段 */
let Region = 'ap-shanghai';     /* 存储桶所在地域，必须字段 */
// 初始化实例
const cos =  new COS({
    // getAuthorization 必选参数
    getAuthorization: function (options, callback) {
        let url = 'http://49.235.232.7:81/kp/cos/getTempSecret'; // url替换成您自己的后端服务
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            console.log(JSON.parse(e.target.responseText));
            try {
                var data = JSON.parse(e.target.responseText);
                var credentials = data.data;
            } catch (e) {
            }
            if (!data || !credentials) {
                return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
            }
            ;
            callback({
                TmpSecretId: credentials.tmpSecretId,
                TmpSecretKey: credentials.tmpSecretKey,
                SecurityToken: credentials.sessionToken,
                // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                StartTime: credentials.startTime, // 时间戳，单位秒，如：1580000000
                ExpiredTime: credentials.expiredTime, // 时间戳，单位秒，如：1580000000
            });
        };
        xhr.send();
    }
});
export default cos
