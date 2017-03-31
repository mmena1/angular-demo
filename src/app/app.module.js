"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard.component");
var hero_detail_component_1 = require("./hero-detail.component");
var hero_service_1 = require("./hero.service");
var heroes_component_1 = require("./heroes.component");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule,
            // The forRoot() method is called because a configured router is provided at the app's root.
            router_1.RouterModule.forRoot([
                {
                    path: 'detail/:id',
                    component: hero_detail_component_1.HeroDetailComponent
                },
                {
                    // To show the dashboard when app starts
                    path: '',
                    redirectTo: '/dashboard',
                    pathMatch: 'full'
                },
                {
                    path: 'dashboard',
                    component: dashboard_component_1.DashboardComponent
                },
                {
                    path: 'heroes',
                    component: heroes_component_1.HeroesComponent
                }
            ])],
        declarations: [app_component_1.AppComponent, hero_detail_component_1.HeroDetailComponent, heroes_component_1.HeroesComponent, dashboard_component_1.DashboardComponent],
        bootstrap: [app_component_1.AppComponent],
        // Providers which will be used for injection in every view
        providers: [hero_service_1.HeroService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map