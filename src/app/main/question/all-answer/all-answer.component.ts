import {Component, Input, OnInit} from '@angular/core';
import {AnswerService} from '../../services/answer/answer.service';
import {SearchListModel} from '../../Models/searchList.model';

@Component({
  selector: 'app-all-answer',
  templateUrl: './all-answer.component.html',
  styleUrls: ['./all-answer.component.css']
})
export class AllAnswerComponent implements OnInit {
  @Input() answerId;
  answerDetails: SearchListModel;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit(): void {
    this.getAnswer(this.answerId);
  }

  getAnswer(answerId): void {
    this.answerService.getAnswerById(answerId).subscribe(res => {
      if (res.items.length > 0) {
        this.answerDetails = res.items[0];
      }
    }, error => {
    });
  }

}
