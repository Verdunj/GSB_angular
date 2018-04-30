"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_service_data_1 = require("../service/app.service.data");
var app_service_crypto_1 = require("../service/app.service.crypto");
var ConnexionComponent = /** @class */ (function () {
    //    visiteur : any;
    function ConnexionComponent(router, dataService, sha1Service) {
        this.router = router;
        this.dataService = dataService;
        this.sha1Service = sha1Service;
        this.titre = "Connexion";
        this.hide = true;
    }
    ConnexionComponent.prototype.valider = function () {
        var _this = this;
        this.dataService.login(this.login)
            .subscribe(function (data) {
            _this.dataService.ticket = data;
            _this.connexion();
        }, function (error) {
            _this.errorMessage = "Erreur de login";
            _this.hide = false;
        });
    };
    ConnexionComponent.prototype.connexion = function () {
        var _this = this;
        var mdpHache = this.sha1Service.hash(this.dataService.ticket + this.mdp);
        this.dataService.connexion(this.login, mdpHache)
            .subscribe(function (data) {
            _this.dataService.ticket = data;
            _this.hide = true;
            _this.router.navigate(['accueil']);
        }, function (error) {
            _this.errorMessage = "Erreur de mot de passe";
            _this.hide = false;
        });
    };
    ConnexionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-connexion',
            templateUrl: 'app.connexion.html',
            styleUrls: ['app.connexion.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, app_service_data_1.DataService, app_service_crypto_1.Sha1Service])
    ], ConnexionComponent);
    return ConnexionComponent;
}());
exports.ConnexionComponent = ConnexionComponent;
//# sourceMappingURL=app.connexion.component.js.map