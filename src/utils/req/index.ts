import Request from "./request";


const axios = new Request({
    baseURL: 'http://liulongbin.top:3006',
    url: '/api/getBooks',
    interceptors: {
        request: {
            success(config) {
                console.log('请求正在发送...实例请求拦截器应用...');
                return config
            }
        },
        response: {
            success(res) {
                console.log('响应接受成功...实例响应拦截器应用...');
                return res
            }
        }
    }
})

type typeData = {
    status: number;
    msg: string;
    data: Array<{
        id: number;
        bookname: string;
        author: string;
        publiser: string;
    }>
}

axios.request<typeData>(
    {
        baseURL: 'http://liulongbin.top',
        url: '/api/getBooks'
    }
)
    .then(res => {
        console.log(res.data);
    })
