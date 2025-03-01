import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstScreenComponent } from './views/first-screen/first-screen.component';
import { SecondScreenComponent } from './views/second-screen/second-screen.component';
import { ThirdScreenComponent } from './views/third-screen/third-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstScreenComponent,
    SecondScreenComponent,
    ThirdScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
