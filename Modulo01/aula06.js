//váriaveís de ambientes

import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    const BASE_URL = __ENV.MY_HOSTNAME ;

    const res = http.get(BASE_URL)
    sleep(1);
  }