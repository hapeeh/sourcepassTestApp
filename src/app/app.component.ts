import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { SurveyService } from './survey.service';
import { debounceTime, delay, distinctUntilChanged, Observable, of, startWith, switchMap, tap } from 'rxjs';

export interface SurveyAnswers {
  name: string;
  prefferedSkill: number[];
  prefferedLang: number;
  bestSkill: number;
  file: string;
  id?: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //radio
  // text
  //  cehckbox
  // dropdown
  // file
  list?: Observable<any>;
  surveyService = inject(SurveyService)


  title = 'Survey for developer';
  description = 'A survey to conducts prefered skillset of developer'
  skillSetCheck = [{ name: 'angular', id: 1 }, { name: 'react', id: 2 }, { name: 'php', id: 3 }];
  skillSetLang = [{ name: 'angular', id: 1 }, { name: 'react', id: 2 }, { name: 'php', id: 3 }];
  skillSetBest = [{ name: 'angular', id: 1 }, { name: 'react', id: 2 }, { name: 'php', id: 3 }];
  searchInput = new FormControl()
  fb = inject(FormBuilder);
  form = this.fb.group({
    name: [''],
    prefferedSkill: [],
    prefferedLang: [],
    bestSkill: [],
    file: [],
    pskill: []
  })
  questions = {
    input: 'Please input text as name', checkbox: 'Please choose checkbox as preffered skill',
    dropdown: 'Please input dropdown as preffered language', radio: 'Please input radio as best skill', file: 'Please input file'
  }
  ngOnInit() {
    this.list = this.surveyService.obsStoreSurveyAns.pipe(startWith([]));
    this.searchInput.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), switchMap((data) => {
      return this.surveyService.findDataByName(data)
    })).subscribe(data => {
      console.log('data', data)
    });
  }
  get formControl() {
    return this.form.controls;
  }
  chckChange = (event: any) => {
    const { checked, value } = event.target;
    let list = this.form.controls.prefferedSkill.value ? this.form.controls.prefferedSkill.value : [];
    if (checked) {
      // check if in array then add if int
      if (!list.some(val => val === value))
        list.push(value as never)
      // list = list.some(val => val === value) ? list : ;

    } else {
      // check if in array then remove if in it
      list = list.filter(val => val !== value)

    }
    this.form.controls.prefferedSkill.patchValue([...list] as any)
    console.log(event.target.value)
  }
  submitAnswer = () => {
    const { name,
      prefferedSkill,
      prefferedLang,
      bestSkill,
      file } = this.form.value;
    const ans = { name, prefferedLang, prefferedSkill, bestSkill, file }
    this.surveyService.addSurvey(ans)
    this.form.reset();
  }

}
