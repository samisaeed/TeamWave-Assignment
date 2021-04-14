import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestionById(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=!4(zDM9eAf1fxxdzbk`);
  }
}
