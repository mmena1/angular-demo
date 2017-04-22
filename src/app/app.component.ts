/*
 * This is the root component of what will become a tree of nested components as the application evolves.
 */
import { Component } from '@angular/core';
@Component({
  selector: 'app',
  // styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'Tour of Heroes';
}
