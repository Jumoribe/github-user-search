import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from 'src/app/components/pages/search-page/search-page.component';
import { DetailsPageComponent } from './components/pages/details-page/details-page.component';
import { RepositoriesPageComponent } from './components/pages/repositories-page/repositories-page.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent },
  { path:':username', component: DetailsPageComponent },
  { path:':username/repos', component: RepositoriesPageComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
