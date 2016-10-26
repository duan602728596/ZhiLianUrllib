
# coding: utf-8

import sys
import types
import urllib
import urllib2


# 获取传递的参数
argv = {
    'filename': sys.argv[0],
    'method': sys.argv[1],
    'url': sys.argv[2],
    'data': sys.argv[3],
}


class Http:
    # 初始化数据
    def __init__(self, method, url, data = ''):
        self.method = method            # 请求的类型
        self.url = url                  # 请求的地址
        self.data = self.getData(data)  # 请求的数据
        # 请求头
        self.header = {
            'Accept-Encoding': 'deflate',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
            'cache-control': 'no-cache',
            'Host': 'sou.zhaopin.com',
        }
    # 获取请求数据的
    def getData(self, data):
        if type(data) is types.StringType:
            gd = data
        elif type(data) is types.DictionaryType:
            gd = urllib.urlencode(data)
        else:
            gd = ''
        return gd
    # get
    def get(self):
        if self.data == '':
            u = self.url
        else:
            u = self.url + '?' + self.data
        request = urllib2.Request(u)
        response = urllib2.urlopen(request)
        return response.read()
    # post
    def post(self):
        request = urllib2.Request(self.url, self.data, self.header)
        response = urllib2.urlopen(request)
        return response.read()
    # init
    def init(self):
        if self.method == 'get':
            self.result = self.get()
        elif self.method == 'post':
            self.result = self.post()
        else:
            self.result = ''

# 初始化请求
http = Http(argv['method'], argv['url'], argv['data'])
http.init()
text = http.result

# 输出请求
print(text)

