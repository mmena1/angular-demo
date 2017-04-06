/*
 * This is the root component of what will become a tree of nested components as the application evolves. 
 */
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  template: `
   <h1>{{title}}</h1>
   <nav>
     <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
     <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
   </nav>
   <router-outlet></router-outlet>
 `
})
export class AppComponent {
  title = 'Tour of Heroes';
}
