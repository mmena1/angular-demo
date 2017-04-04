"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
 * This is the root module that tells Angular how to assemble the application, kind of like a pom.xml file.
 */
var app_routing_module_1 = require("./app-routing.module");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard.component");
var hero_detail_component_1 = require("./hero-detail.component");
var hero_search_component_1 = require("./hero-search.component");
var hero_service_1 = require("./hero.service");
var heroes_component_1 = require("./heroes.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var in_memory_data_service_1 = require("./in-memory-data.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        // External modules used in the app must be declared here
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, app_routing_module_1.AppRoutingModule, http_1.HttpModule,
            /*
             * Rather than require a real API server, this example simulates communication with the remote server
             * by adding the InMemoryWebApiModule to the module imports
             */
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService)],
        // Custom components used in the app must be declared here
        declarations: [app_component_1.AppComponent, hero_detail_component_1.HeroDetailComponent, heroes_component_1.HeroesComponent, dashboard_component_1.DashboardComponent, hero_search_component_1.HeroSearchComponent],
        bootstrap: [app_component_1.AppComponent],
        // Providers which can be used for injection anywhere in the app
        providers: [hero_service_1.HeroService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map