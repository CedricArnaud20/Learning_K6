import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';


const QtdChamadas = new Counter('my_counter')
const myGauge = new Gauge('Tempo_bloqueado');
const myRate = new Rate('taxa_req_200');
const myTrend = new Trend('taxa_de_espera');


export const options = {
  vus: 5,
  duration: '10s',
};


export default function () {
  const req = http.get('http://test.k6.io');
  sleep(1);
  QtdChamadas.add(1)
  //medidor
  myGauge.add(req.timings.blocked);
  //taxa
  myRate.add(req.status === 200);
  //tendencia
  myTrend.add(req.timings.waiting);
}


