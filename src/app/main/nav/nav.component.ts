import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchService} from '../services/search/search.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {PaginationService} from '../../shared/services/pagination/pagination.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  SearchDataList = new FormControl();
  spinner: boolean;
  private unsubscribeAll$ = new Subject();
  @ViewChild('input') inputSearch;

  constructor(private searchService: SearchService,
              private router: Router) {
  }

  ngOnInit(): void {
  }


  onKyeUp(e): void {
    this.searchService.$searchText.next(e.target.value);
    const value = e.target.value.replace(/ /g, '');
    this.inputSearch.nativeElement.value = ' ';
    let tem = value.split('][');
    if (tem.length > 1) {
      const arr = [];
      arr.push(tem.join());
      tem = arr;
    }
    tem.forEach(val => {
      if (val[0] === '[' && val[val.length - 1] === ']') {
        this.getTaggedQuestion(val.split('[').join('').split(']').join('').split(',').join('+'));
      } else {
        this.getNormalQuestion(val);
      }
    });
  }

  getNormalQuestion(result): void {
    this.searchService.$questionItem.next(true);
    this.spinner = true;
    this.searchService.getSearchResult(result)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(res => {
        this.spinner = false;
        this.router.navigateByUrl('search').then(r => r);
        this.searchService.$searchResult.next(res);
      }, error => {
        this.spinner = false;
      });
  }

  getTaggedQuestion(result): void {
    this.searchService.$questionItem.next(false);
    this.spinner = true;
    this.searchService.getSearchResult(result)
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(res => {
        this.spinner = false;
        this.router.navigateByUrl('search').then(r => r);
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
