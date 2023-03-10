import { SurveyAnswers } from './app.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor() { }
  private id: number = 0;
  private storeSurveyAns = new BehaviorSubject<any>([]);
  obsStoreSurveyAns = this.storeSurveyAns.asObservable();

  set newListSurvey(ans: any[]) {
    this.storeSurveyAns.next(ans);
  }

  get listSurveyVal(): any[] {
    return this.storeSurveyAns.getValue();
  }

  addSurvey = (individualAns: any): void => {
    const newid = ++this.id;
    individualAns.id = newid;
    const oldSurveyList = this.listSurveyVal;
    const newList = [...oldSurveyList, individualAns];
    this.newListSurvey = newList;
  }
  findDataByName(name: string) {
    return this.listSurveyVal.map(data => {
      if (data.name.includes(name))
        return data
    }) ?? []
  }

}
