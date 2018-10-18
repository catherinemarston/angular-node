import { Component, OnInit } from '@angular/core';
import { MessagesService, Message } from 'src/app/messages/messages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-messages',
    template: `<div *ngFor="let message of (messagesService.messages | async)">
        <mat-card>
        <mat-card-title [routerLink]="['/messages', message.sender]">{{message.sender}}</mat-card-title>
        <mat-card-content>{{message.text}}</mat-card-content> </mat-card>
        </div>"`,
    styleUrls: ['./message.component.scss'],
})
export class MessagesComponent implements OnInit {
    messages;

    constructor(
        public messagesService: MessagesService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        const name = this.route.snapshot.params.name;
        this.messagesService.getMessages(name);
        // this.messagesService.messages.subscribe(messages => {
        //     this.messages = messages;
        // });
        // this.messagesService.getMessages().subscribe(res => {
        //     this.messages = res;
        // });
    }
}
