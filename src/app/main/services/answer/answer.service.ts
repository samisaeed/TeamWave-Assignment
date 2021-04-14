import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswerById(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}answers/${id}?order=desc&sort=activity&site=stackoverflow&filter=!9_bDE(fI5`);
  }
}
