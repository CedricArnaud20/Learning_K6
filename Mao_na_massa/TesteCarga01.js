import http from 'k6/http';
import { check, sleep } from 'k6';

///Load Test
// carga 10 vu por 10s
//req com sucesso 95%
// req com falha < 1%
//duração de req p(95) < 5

export const options = {

    
    stages: [{duration: '10', target: 10}],


    thresholds:{
        checks:['rate > 0.95'],
        http_req_failed: ['rate > 0.01'],
        http_req_duration: ['p(95) < 500'] 
    }
}

export default function(){

    const USER = `${Math.random()}@email.com`
    const BASE_URL = 'https://test-api.k6.io'
    const PASSWORD = 'user123'

    console.log( USER + PASSWORD )

    const res = http.post(`${BASE_URL}/user/register/`,{
        username: USER,
        firstname: 'Croco',
        lastname: 'Dino',
        email: USER,
        password: PASSWORD
    })

    check(res,{
        'Sucesso no cadastro de usuários': (r) => r.status === 201,
    })


    sleep(1)
}
