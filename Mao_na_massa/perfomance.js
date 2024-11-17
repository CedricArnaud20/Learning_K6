import http from 'k6/http';
import { check, sleep } from 'k6';


//Fase de configuração
export const options = {
    // como é um teste de cargar efeinir stage pois o teste va alternando a carga conforme necessário
    stages:[
        {duration: '5s', target: 10 },
        {duration: '7s', target: 10 },
        {duration: '7s', target: 0 }
    ],
    thresholds: {
        checks: ['rate > 0.99'],
        http_req_duration: ['p(95) < 200'] // 95% das requsição deve executar em  200 
    },
    ext:{
        loadimpact: {
            projectID: '3724609',
            name: 'K6 Mão na Massa'
        }
    }


}


export default function(){
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/1';

    const res = http.get(BASE_URL)

    check(res,{
        'is status 200': (r) => r.status === 200,
    })

}



