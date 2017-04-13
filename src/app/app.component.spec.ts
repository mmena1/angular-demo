import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLinkStubDirective } from '../../testing/router-stubs';

describe('AppComponent', () => {
  let h1: DebugElement;
  let el: HTMLElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let linkDes: DebugElement[];
  let links: RouterLinkStubDirective[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      h1 = fixture.debugElement.query(By.css('h1'));
      el = h1.nativeElement;
      fixture.detectChanges();
      // find DebugElements with an attached RouterLinkStubDirective
      linkDes = fixture.debugElement
        .queryAll(By.directive(RouterLinkStubDirective));

      // get the attached link directive instances using the DebugElement injectors
      links = linkDes
        .map((de) => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });
  }));

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <h1> text', () => {
    expect(el.textContent).toContain(comp.title);
  });

  it('title in the DOM should be equal to the component title', () => {
    expect(el.textContent).toEqual(comp.title);
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
    expect(links[1].linkParams).toBe('/heroes', '1st link should go to Heroes');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[1];
    const heroesLink = links[1];

    expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');

    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(heroesLink.navigatedTo).toBe('/heroes');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[1];
    const heroesLink = links[1];

    expect(heroesLink.navigatedTo).toBeNull('link should not have navigated yet');

    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(heroesLink.navigatedTo).toBe('/heroes');
  });

});
