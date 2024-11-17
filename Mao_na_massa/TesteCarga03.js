
//realizar consulta de api de listagem de crocodilos e buca por id de corcodilos 
//Esperar um RPS de 30 RQS/S para a API d elistagem de crocodilos durante 30 s
//Para a busca por id, o sistema deve atender 50 usuários onde cada usuáio reaiza aé 20 solicitações em até 20 segundos
    //usuários par devem realizar buscar ao crocodilo de ID 2
    //usuários impar devem realizar buscar ao crocodilo de ID 1
//Ambos os testes devem ser excutados simultaneamente    

//https://test-api.k6.io/

import http from 'k6/http';

export const options = {
    scenarios:{
        listar:{
            executor:'constant-arrival-rate',
            exec: 'listar',
            duration:'30s',
            rate: 200,
            timeUnit:'1s',
            preAllocatedVUs: 10,
            gracefulStop: '10s', 
            tags: {test_Type: 'listagem_de_crocodilos'}
        },
        buscar:{
            executor:'per-vu-iterations',
            exec: 'buscar',
            vus: 5,
            iterations: 20,
            maxDuration:'1m',
            gracefulStop: '10s',
            tags:{ test_type: 'buscar_de_Crocodilos_id'}

        }
    }
}


export function listar(){
    http.get(__ENV.URL + '/crocodiles');
}

export function buscar(){
    if (__VU % 2 == 0) {
        http.get(__ENV.URL + '/crocodiles/2');
    } else {
        http.get(__ENV.URL + '/crocodiles/1');
    }
}











































