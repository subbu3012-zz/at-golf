import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../../../environments/environment'
import { Observable } from 'rxjs'
import { SharedService } from '../../../layout/shared.service'

@Component({
    selector: 'news-feed',
    templateUrl: './news-feed.component.html',
    styleUrls: ['./news-feed.component.scss'],
})
export class NewsFeedComponent implements OnInit {
    public newsFeedList:any[] = [];
    constructor(
        private httpClient: HttpClient,
        public sharedServ: SharedService
    ) { }

    ngOnInit() {
        this.getAllPosts().subscribe(data => {
            this.newsFeedList = data;
        })
    }

    public getAllPosts(): Observable<any> {
        return this.httpClient.get<any>(environment.hostName + "posts",
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
