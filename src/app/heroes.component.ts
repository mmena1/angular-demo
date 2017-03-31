import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  styleUrls: ['./heroes.component.css'],
  selector: 'my-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  // Dependency injection
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

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

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
