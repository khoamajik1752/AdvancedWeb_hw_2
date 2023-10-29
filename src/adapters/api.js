
import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export async function getAll({page,per_page}) {
    let response = await instance.get('/photos', {
        params: {
            client_id: '2323',
            page: page,
            per_page: per_page
        }
    })

    console.log(response.data.map(num=>{
       return  num.urls.small
    }))
    return response
}

