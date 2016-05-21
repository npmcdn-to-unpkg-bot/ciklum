import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestMethod } from '@angular/http';

import { Lotto } from './lotto';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LottoService {
	private resultsUrl = 'https://media.lottoland.com/api/drawings/euroJackpot';  // URL to get the results
	constructor(private http: Http) { }
  
  // Promise<Lotto>
	getLastLottoResults():Promise<Lotto> {
    return this.http.get('https://media.lottoland.com/api/drawings/euroJackpot')
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
	}

	private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}