import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstScreenComponent } from './views/first-screen/first-screen.component';
import { SecondScreenComponent } from './views/second-screen/second-screen.component';
import { ThirdScreenComponent } from './views/third-screen/third-screen.component';

const routes: Routes = [
  {
    path: '',
    component: FirstScreenComponent,
    pathMatch: 'full',
  },
  {
    path: 'second-screen',
    component: SecondScreenComponent,
    pathMatch: 'full',
  },
  {
    path: 'third-screen',
    component: ThirdScreenComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
