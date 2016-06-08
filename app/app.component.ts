/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import {Control} from 'angular2/common';

import {WikipediaService} from '../app/WikipediaService'

import {JSONP_PROVIDERS} from 'angular2/http';

//import {Observable} from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'my-app',
    template: `
       <div>
      <h2>Wikipedia Search</h2><br>
      <b>Search Text</b> :<br>
      <div><font color='orange'>Bora has been writing code for as long as he can remember and has been getting paid to do it since 1996. .Net And Web technologies is his passion. And he is really interested in with Azure. 
            He is working as a Senior Software Architect  for Dogan Gazetecilik, which is the biggest media company in Turkey. In the past, he was working as a Development Team Leader for Medyanet Dogan Online, which 
            is the most known adserver company in Turkey. And also he was working for StartTv which is the very popular tv channel portal as a Software Manager and Technical Leader. In fact, his specialty Crm. He worked 
            so many years on crm content management system as a Team Leader for Linde. He had the opportunity to work on many different platforms. Such as research and development on telecommunication company for Turkcell, 
            kiosk and electronic scales programming for Mental, dynamic web page framework algorithms for CitiBank and speech recognition.</font></div>
            <br><br>
      <input type="text" [value]="term"/>
      <ul>
        <li *ngFor="#item of items | async">{{item}}</li>
      </ul>
    </div>
    `,
    providers: [WikipediaService, JSONP_PROVIDERS]
})

export class AppComponent {

    text = `Bora has been writing code for as long as he can remember and has been getting paid to do it since 1996. .Net And Web technologies is his passion. And he is really interested in with Azure. 
            He is working as a Senior Software Architect  for Dogan Gazetecilik, which is the biggest media company in Turkey. In the past, he was working as a Development Team Leader for Medyanet Dogan Online, which 
            is the most known adserver company in Turkey. And also he was working for StartTv which is the very popular tv channel portal as a Software Manager and Technical Leader. In fact, his specialty Crm. He worked 
            so many years on crm content management system as a Team Leader for Linde. He had the opportunity to work on many different platforms. Such as research and development on telecommunication company for Turkcell, 
            kiosk and electronic scales programming for Mental, dynamic web page framework algorithms for CitiBank and speech recognition.`;

    randomInterval$ = Observable.range(0, this.text.length)
        .concatMap(x => Observable.of(x)
            .delay(Math.random() * 500)
        );

    term: string = "";
    term$ = Observable.from(this.text, function (x) { return x; })
        .zip(this.randomInterval$, x => x)
        .scan((a, c) => (c === " ") ? "" : a + c)
        .share()
        .map((result: string) => this.term = result)


    items: Observable<Array<string>>;
    constructor(private wikipediaService: WikipediaService) {
        this.items = this.term$
            .debounceTime(250)
            .distinctUntilChanged()
            .switchMap((term: string) => this.wikipediaService.search(term))
    }
}