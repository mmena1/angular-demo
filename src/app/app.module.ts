import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [BrowserModule, FormsModule,
    // The forRoot() method is called because a configured router is provided at the app's root.
    RouterModule.forRoot([
      {
        path: 'detail/:id',
        component: HeroDetailComponent
      },
      {
        // To show the dashboard when app starts
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'heroes',
        component: HeroesComponent
      }
    ])],
  declarations: [AppComponent, HeroDetailComponent, HeroesComponent, DashboardComponent],
  bootstrap: [AppComponent],
  // Providers which will be used for injection in every view
  providers: [HeroService]
})
export class AppModule { }
