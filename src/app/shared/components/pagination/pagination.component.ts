import { Component, OnInit } from '@angular/core';
import {PaginationService} from '../../services/pagination/pagination.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  totalCount;
  constructor(private paginatorService: PaginationService) { }

  ngOnInit(): void {
    this.paginatorService.onTableDataChange.subscribe( res => {
      if (res) {
        this.totalCount = res;
      }
      return;
    });
  }
  onPageChange($event: PageEvent): void {
    this.paginatorService.onPageChange($event);
  }

}
