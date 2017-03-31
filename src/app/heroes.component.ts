import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';

@Component({
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`],
  selector: 'my-heroes',
  template: `
  <h2>My Heroes</h2>
  <ul class="heroes">

    <!-- asign a variable "hero" for each element in the list -->
    <!-- add a click event to each item which will triggers the onSelect method -->
    <!-- add a css style class "selected" if this item is selected -->
    
    <li *ngFor="let hero of heroes"
      (click)="onSelect(hero)"
      [class.selected]="hero === selectedHero">

     <!-- each hero goes here -->
     <span class="badge">{{hero.id}}</span> {{hero.name}}

    </li>
  </ul>

  <!-- After declaring HeroDetailComponent in app.module.ts, we can show the hero details
and bind the selected item to the hero property in HeroDetailComponent -->
  <hero-detail [hero]="selectedHero"></hero-detail>
  `
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  // Dependency injection
  constructor(private heroService: HeroService) { }

  // Postconstruct
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }
}
