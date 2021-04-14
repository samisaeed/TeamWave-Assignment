import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  onTableDataChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  tableChangeEvent: BehaviorSubject<any> = new BehaviorSubject<any>(
    {
      per_page: 15,
      page: 1,
    }
  );
  private page: any;

  onPageChange($event: PageEvent): void {
    this.page = {pageNumber: $event.pageIndex, pageSize: $event.pageSize};
    const PageEventChange = {
      per_page: $event.pageSize,
      page: $event.pageIndex + 1,
    };
    this.tableChangeEvent.next(PageEventChange);
  }
}
