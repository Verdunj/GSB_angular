"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var app_connexion_component_1 = require("./connexion/app.connexion.component");
var app_medecins_component_1 = require("./medecins/app.medecins.component");
var app_visites_component_1 = require("./visites/app.visites.component");
var app_navbar_component_1 = require("./navbar/app.navbar.component");
var app_component_1 = require("./app.component");
var app_service_data_1 = require("./service/app.service.data");
var app_service_crypto_1 = require("./service/app.service.crypto");
var appRoutes = [
    { path: '', component: app_connexion_component_1.ConnexionComponent },
    { path: 'connexion', component: app_connexion_component_1.ConnexionComponent },
    { path: 'medecins', component: app_medecins_component_1.MedecinsComponent },
    { path: 'visites', component: app_visites_component_1.VisitesComponent },
    { path: 'accueil', component: app_navbar_component_1.NavbarComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes), http_1.HttpModule],
            declarations: [app_component_1.AppComponent, app_connexion_component_1.ConnexionComponent, app_navbar_component_1.NavbarComponent, app_medecins_component_1.MedecinsComponent, app_visites_component_1.VisitesComponent],
            providers: [app_service_data_1.DataService, app_service_crypto_1.Sha1Service],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map