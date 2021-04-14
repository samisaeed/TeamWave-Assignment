import {Component, Input, OnInit} from '@angular/core';
import {SearchListModel} from '../../Models/searchList.model';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input() searchResult: SearchListModel;
  showTags: boolean;

  constructor(private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    if (this.searchResult.tags.length > 0) {
      this.showTags = true;
    } else {
      this.showTags = false;
    }
    if (this.searchResult){
      this.searchService.$questionDetails.next(this.searchResult);
    }

  }

  onQuestionClick(id): void {
    this.router.navigateByUrl(`question/${id}`).then(r => r);
  }
}
