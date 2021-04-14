import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {SearchService} from '../services/search/search.service';
import {takeUntil} from 'rxjs/operators';
import {PaginationService} from '../../shared/services/pagination/pagination.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{
  private unsubscribeAll$ = new Subject();
  searchData;
  searchTitle;
  searchTag: boolean;
  noDataFound: boolean;
  spinner: boolean;
  constructor( private searchService: SearchService,
               private paginatorService: PaginationService) { }

  ngOnInit(): void {
    this.getSearchResult();
    this.getSearchTitle();
    this.paginatorService.tableChangeEvent
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(reloadEvent => {
        if (reloadEvent.per_page === 15) {
          return;
        }else {
          if (this.searchTag === true) {
            this.getNormalQuestion(this.searchTitle, reloadEvent.page, reloadEvent.per_page);
          }else {
            this.getTaggedQuestion(this.searchTitle, reloadEvent.page, reloadEvent.per_page);
          }
        }
      });
  }

  getSearchResult(): void {
    this.searchService.$searchResult.
    pipe(takeUntil(this.unsubscribeAll$))
      .subscribe( res => {
        if (res) {
          this.searchData = res;
          if ( res.items.length > 0 ){
            this.noDataFound = false;
            this.paginatorService.onTableDataChange.next(res.total);
          }else {
            this.noDataFound = true;
          }
        }
      });
  }
  getSearchTitle(): void {
    this.searchService.$questionItem.
    pipe(takeUntil(this.unsubscribeAll$))
      .subscribe( res => {
        if (res === true) {
          this.searchTag = true;
        }else {
          this.searchTag = false;
        }
      });

    this.searchService.$searchText.
    pipe(takeUntil(this.unsubscribeAll$))
      .subscribe( res => {
        if (res) {
          this.searchTitle = res;
        }
      });
  }


  getNormalQuestion(result, page, pageSize): void {
    this.spinner = true;
    this.searchService.getSearchResultByPage(result, page, pageSize)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(res => {
        this.spinner = false;
        this.searchService.$searchResult.next(res);
      }, error => {
        this.spinner = false;
      });
  }

  getTaggedQuestion(result, page, pageSize): void {
    this.spinner = true;
    this.searchService.getTaggedSearchResultByPage(result, page, pageSize)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(res => {
        this.spinner = false;
        this.searchService.$searchResult.next(res);
      }, error => {
        this.spinner = false;
      });
  }




  ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.complete();
  }
}
