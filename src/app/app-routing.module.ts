import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstScreenComponent } from './views/first-screen/first-screen.component';

const routes: Routes = [
  {
    path: '',
    component: FirstScreenComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
