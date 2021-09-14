import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { DetailsPageComponent } from './components/pages/details-page/details-page.component';
import { RepositoriesPageComponent } from './components/pages/repositories-page/repositories-page.component';
import { LoadingComponent } from './components/layout/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    DetailsPageComponent,
    RepositoriesPageComponent,
    LoadingComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
