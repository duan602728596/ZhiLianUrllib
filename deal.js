
/**
 * 处理数据
 * @param dealText{string}：获取到的页面源代码
 * @param ishref{boolean}：是否获取下一页的地址，默认为false，不获取
 */

const cheerio = require('cheerio');


/* 提取冒号后面的文本 */
const mhtext = text => text.replace(/.+：/, '');

function each($, ishref = false){
    const a = [];
    // 获取table
    const $table = $('#newlist_list_content_table').children('table');
    for(let i = 0, j = $table.length; i < j; i++){
        const $this = $table.eq(i);
        const $tr = $this.children('tr'),
            $tr0 = $tr.eq(0),
            $tr1 = $tr.eq(1);
        const $span =  $tr1.children('td').children('div').children('div').children('ul').children('li').children('span');

        if($this.children('tr').children('th').length <= 0){
            a.push({
                // 职位招聘
                'zwzp': $tr0.children('.zwmc').children('div').children('a').html(),
                // 招聘地址
                'zpdz': $tr0.children('.zwmc').children('div').children('a').prop('href'),
                // 反馈率
                'fklv': $tr0.children('.fk_lv').children('span').html(),
                // 公司名称
                'gsmc': $tr0.children('.gsmc').children('a').html(),
                // 工作地点
                'gzdd': $tr0.children('.gzdd').html(),
                // 进入地址
                'zldz': $tr0.children('.gsmc').children('a').prop('href'),
                // 公司性质
                'gsxz': mhtext($span.eq(1).html()),
                // 公司规模
                'gsgm': mhtext($span.eq(2).html())
            });
        }
    }

    const r = {};
    r['list'] = a;
    if(ishref != false){
        r['href'] = $('.pagesDown').children('ul').children('li').children('a').eq(2).prop('href').replace(/&p=\d/, '');
    }
    return r;
}

function deal(dealText, ishref = false){
    const $ = cheerio.load(dealText, {
        decodeEntities: false
    });


    return each($, ishref);
}

module.exports = deal;
