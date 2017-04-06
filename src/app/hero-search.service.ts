import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Hero } from './hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) { }
  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`app/heroes/?name=${term}`)
      /*
       * There is no need to call toPromise() as the data is already loaded, 
       * we just return the Observable from the the http.get()
       */
      .map(response => response.json().data as Hero[]);
  }
}
