import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { NavComponent } from './main/nav/nav.component';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from './shared/components/loader/loader.module';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./main/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./main/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'question/:id',
    loadChildren: () =>
      import('./main/question/question.module').then(m => m.QuestionModule),
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LoaderModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
