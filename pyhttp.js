
/**
 * 与python脚本通信，进行一个请求
 * @param info{object}：与python脚本通信的配置
 * @param callback{function}：通信完成后执行的事件，传递参数为返回的数据 
 */

const childProcess = require('child_process');


function pyhttp(info, callback){
    /* 发送请求 */
    return new Promise((resolve, reject)=>{
        // cmd
        const cps = childProcess.spawn('python', [
            // avgs
            info.file,
            info.method,
            info.url,
            info.data
        ]);
        // 储存文本
        let txt = '';

        // 错误
        cps.stderr.on('data', function(data){
            reject(data);
        });

        // 获取数据
        cps.stdout.on('data', function(data){
            txt += data;
        });

        // 获取完数据
        cps.on('exit', function(code){
            resolve(txt);
        });

    }).then(callback).catch((error)=>{
        console.log(error);
    });
}

module.exports = pyhttp;

