import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public $searchText = new BehaviorSubject(null);
  public $searchResult = new BehaviorSubject(null);
  public $questionDetails = new BehaviorSubject(null);
  public $questionItem = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getSearchResult(result): Observable<any> {
    return this.http.get(`${environment.baseUrl}search/advanced?order=desc&sort=activity&q=${result}&site=stackoverflow&filter=!--1nZwT3vV2Y`);
  }
  getTaggedSearchResult(result): Observable<any> {
    return this.http.get(`${environment.baseUrl}search/advanced?order=desc&sort=activity&tagged==${result}&site=stackoverflow&filter=!--1nZwT3vV2Y`);
  }
  getSearchResultByPage(result, page, pageSize): Observable<any> {
    return this.http.get(`${environment.baseUrl}search/advanced?page=${page}&pagesize=${pageSize}&order=desc&sort=activity&q=${result}&site=stackoverflow&filter=!--1nZwT3vV2Y`);
  }
  getTaggedSearchResultByPage(result, page, pageSize): Observable<any> {
    return this.http.get(`${environment.baseUrl}search/advanced?page=${page}&pagesize=${pageSize}&order=desc&sort=activity&tagged==${result}&site=stackoverflow&filter=!--1nZwT3vV2Y`);
  }
}
