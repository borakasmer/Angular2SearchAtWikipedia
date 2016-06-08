/// <reference path="../typings/tsd.d.ts" />
System.register(['angular2/core', '../app/WikipediaService', 'angular2/http', 'rxjs/Rx', 'rxjs/add/operator/map', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/switchMap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, WikipediaService_1, http_1, Rx_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (WikipediaService_1_1) {
                WikipediaService_1 = WikipediaService_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(wikipediaService) {
                    var _this = this;
                    this.wikipediaService = wikipediaService;
                    this.text = "Bora has been writing code for as long as he can remember and has been getting paid to do it since 1996. .Net And Web technologies is his passion. And he is really interested in with Azure. \n            He is working as a Senior Software Architect  for Dogan Gazetecilik, which is the biggest media company in Turkey. In the past, he was working as a Development Team Leader for Medyanet Dogan Online, which \n            is the most known adserver company in Turkey. And also he was working for StartTv which is the very popular tv channel portal as a Software Manager and Technical Leader. In fact, his specialty Crm. He worked \n            so many years on crm content management system as a Team Leader for Linde. He had the opportunity to work on many different platforms. Such as research and development on telecommunication company for Turkcell, \n            kiosk and electronic scales programming for Mental, dynamic web page framework algorithms for CitiBank and speech recognition.";
                    this.randomInterval$ = Rx_1.Observable.range(0, this.text.length)
                        .concatMap(function (x) { return Rx_1.Observable.of(x)
                        .delay(Math.random() * 500); });
                    this.term = "";
                    this.term$ = Rx_1.Observable.from(this.text, function (x) { return x; })
                        .zip(this.randomInterval$, function (x) { return x; })
                        .scan(function (a, c) { return (c === " ") ? "" : a + c; })
                        .share()
                        .map(function (result) { return _this.term = result; });
                    this.items = this.term$
                        .debounceTime(250)
                        .distinctUntilChanged()
                        .switchMap(function (term) { return _this.wikipediaService.search(term); });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n       <div>\n      <h2>Wikipedia Search</h2><br>\n      <b>Search Text</b> :<br>\n      <div><font color='orange'>Bora has been writing code for as long as he can remember and has been getting paid to do it since 1996. .Net And Web technologies is his passion. And he is really interested in with Azure. \n            He is working as a Senior Software Architect  for Dogan Gazetecilik, which is the biggest media company in Turkey. In the past, he was working as a Development Team Leader for Medyanet Dogan Online, which \n            is the most known adserver company in Turkey. And also he was working for StartTv which is the very popular tv channel portal as a Software Manager and Technical Leader. In fact, his specialty Crm. He worked \n            so many years on crm content management system as a Team Leader for Linde. He had the opportunity to work on many different platforms. Such as research and development on telecommunication company for Turkcell, \n            kiosk and electronic scales programming for Mental, dynamic web page framework algorithms for CitiBank and speech recognition.</font></div>\n            <br><br>\n      <input type=\"text\" [value]=\"term\"/>\n      <ul>\n        <li *ngFor=\"#item of items | async\">{{item}}</li>\n      </ul>\n    </div>\n    ",
                        providers: [WikipediaService_1.WikipediaService, http_1.JSONP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [WikipediaService_1.WikipediaService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map