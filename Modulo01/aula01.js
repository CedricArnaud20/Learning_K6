import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  vus: 5,
  duration: '10s',
};


export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}

export function teardown(){
    
}

