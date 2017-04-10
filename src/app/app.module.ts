/*
 * This is the root module that tells Angular how to assemble the application,
 * kind of like the dependencies in a pom.xml file.
 */
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import '../styles/styles.css';

@NgModule({
  // External modules used in the app must be declared here
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpModule,
    /*
     * Rather than require a real API server, this example simulates communication with the remote server
     * by adding the InMemoryWebApiModule to the module imports
     */
    InMemoryWebApiModule.forRoot(InMemoryDataService)],

  // Custom components used in the app must be declared here
  declarations: [AppComponent, HeroDetailComponent, HeroesComponent, DashboardComponent, HeroSearchComponent],
  bootstrap: [AppComponent],
  // Providers which can be used for injection anywhere in the app
  providers: [HeroService]
})
export class AppModule {
}
