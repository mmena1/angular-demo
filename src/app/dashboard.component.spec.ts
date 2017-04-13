import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { async } from '@angular/core/testing';
import { HeroService } from './hero.service';
import Spy = jasmine.Spy;

describe('DashboardComponent (templateUrl)', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement[];
  let el: HTMLElement[];
  let heroService: HeroService;
  let spy: Spy;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [DashboardComponent], // declare the test component
      providers: [HeroService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();  // compile template and css;

  }));

  beforeEach(() => {

    let heroes = Promise.resolve({
        hero1: {
          id: 1,
          name: 'hero1'
        },
        hero2: {
          id: 2,
          name: 'hero2'
        },
        hero3: {
          id: 3,
          name: 'hero3'
        },
        hero4: {
          id: 4,
          name: 'hero4'
        },
      })
    ;

    fixture = TestBed.createComponent(DashboardComponent);

    comp = fixture.componentInstance; // DashboardComponent test instance

    // HeroService actually injected into the component
    heroService = fixture.debugElement.injector.get(HeroService);

    spy = spyOn(heroService, 'getHeroes')
      .and.returnValue(Promise.resolve(heroes));

    // query for the title <h4> by CSS element selector
    de = fixture.debugElement.queryAll(By.css('h4'));
    let i: number = 0;
    de.forEach(
      (element) => el[i] = element.nativeElement);
    i++;
  });

  // it('should display the heros from service', () => {
  //   fixture.detectChanges();
  //   let names: string[] = [];
  //   heroService.getHeroes();
  //   // exctract the value of each element and pushes into the string array
  //   el.forEach(html => names.push(html.textContent));
  //   de.forEach(element => expect(names.find(name => name === element.name)).toBeTruthy());
  // });

  // it('should not show heroes before OnInit', () => {
  //   expect(spy.calls.any()).toBe(false, 'getHeroes not yet called');
  // });
  //
  // it('should still not show heroes after component initialized', () => {
  //   fixture.detectChanges();
  //   de = fixture.debugElement.queryAll(By.css('h4'));
  //   expect(de.length).toEqual(0, 'still no heroes');
  //   // getQuote service is async => still has not returned with quote
  //   expect(spy.calls.any()).toBe(true, 'getHeroes called');
  //   expect(heroService.getHeroes).toHaveBeenCalled();
  // });

});
