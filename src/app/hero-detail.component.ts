/**
 * New typescript file
 */
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // Declares this property as an Input property so it can be binded in HeroesComponent template
  // @Input (no longer needed because we are using a route module)
  public hero: Hero;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  /*
   * Inside the ngOnInit lifecycle hook,
   * we use the params Observable to extract the id parameter value from the ActivatedRoute service
   * and use the HeroService to fetch the hero with that id.
   */
  ngOnInit(): void {
    this.route.params
    /**
     * Since the parameters are provided as an Observable,
     * we use the switchMap operator to provide them for the id parameter
     * by name and tell the HeroService to fetch the hero with that id.
     * The switchMap operator maps the id in the Observable route parameters to a new Observable.
     */
    // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))

      /*
       * The subscribe method is used to detect id changes and to (re)set the retrieved Hero.
       */
      .subscribe((hero: Hero) => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}
