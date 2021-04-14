import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { AllAnswerComponent } from './all-answer/all-answer.component';
import {LoaderModule} from '../../shared/components/loader/loader.module';
import {QuestionService} from '../services/question/question.service';
import {AnswerService} from '../services/answer/answer.service';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent
  }
];

@NgModule({
  declarations: [QuestionComponent, AllAnswerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    LoaderModule,
  ],
  providers: [
    QuestionService,
    AnswerService
  ]
})
export class QuestionModule { }
