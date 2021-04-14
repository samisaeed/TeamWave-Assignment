import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../services/question/question.service';
import {SearchListModel} from '../Models/searchList.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  paramId;
  showTags: boolean;
  showAnswer: boolean;
  isLoading: boolean;
  questionDetails: SearchListModel;
  constructor(private route: ActivatedRoute,
              private  questionService: QuestionService) { }

  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.getQuestionById(this.paramId);
  }
  getQuestionById(id): void {
    this.isLoading = true;
    this.questionService.getQuestionById(id).subscribe( res => {
      this.isLoading = false;
      if (res.items.length > 0) {
        this.questionDetails = res.items[0];
        if (this.questionDetails.tags.length > 0) {
          this.showTags = true;
        } else {
          this.showTags = false;
        }
        if (this.questionDetails.answers.length > 0) {
          this.showAnswer = true;
        } else {
          this.showAnswer = false;
        }
      }
    }, error => {
      this.isLoading = false;
    });
  }

}
