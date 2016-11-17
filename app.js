
const fs = require('fs');
const pyhttp = require('./pyhttp');
const deal = require('./deal');
const _result = {};

/**
 * 请求地址和参数
 *
 * jl：地点
 * kw：职位关键字
 * sf：工资范围下限
 * st：工资范围上限
 * el：学历
 * et：职位类型
 * pd：发布时间
 * p:  分页page
 * ct：公司性质
 * sb：相关度
 * we: 工作经验
 *
 */

const info = (url, method = 'get', data = '')=>{
    return {
        // python脚本
        file: 'http.py',
        // 请求类型
        method: method,
        // 请求地址
        url: url,
        // 请求数据
        data: data
    }
};

const page = 6; // 循环次数
const zlUrl = encodeURI('http://sou.zhaopin.com/jobs/searchresult.ashx?' + 
                        'jl=北京&kw=web前端&sm=0&sf=10001&st=15000&el=4&we=0103&isfilter=1&p=1&et=2');

// 回调
const callback = (text)=>{
    return new Promise((resolve, reject)=>{
        resolve(text);
    });
};

pyhttp(info(zlUrl), function(text){
    
    const p0 = deal(text, true);
    _result.list = p0.list;

    const n = [];
    for(let i = 0; i < page; i++){
        n.push(pyhttp(info(`${p0.href}&p=${i + 2}`)), callback);
    }

    Promise.all(n).then((result)=>{
        for(let i in result){
            _result.list = _result.list.concat(deal(result[i]).list);
        }
    }).then(()=>{
        fs.writeFile('./result/result.js', `window._result = ${JSON.stringify(_result, null, 4)};`, (error)=>{
            if(error){
                console.log(error);
            }else{
                console.log('写入数据成功！');
            }
        });
    });
});
