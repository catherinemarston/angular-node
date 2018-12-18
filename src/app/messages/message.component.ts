import { Component, OnInit } from '@angular/core';
import { MessagesService, Message } from 'src/app/messages/messages.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-messages',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
})
export class MessagesComponent implements OnInit {
    messages;
    results;
    searchTerm$ = new Subject<string>();

    constructor(
        public messagesService: MessagesService,
        private route: ActivatedRoute,
    ) {
        this.messagesService.search(this.searchTerm$)
        .subscribe(res => {
          this.results = res.results;
        });
    }

    ngOnInit() {
        const name = this.route.snapshot.params.name;
        this.messagesService.getMessages(name);
        this.messagesService.getUser().subscribe();

        // this.messagesService.messages.subscribe(messages => {
        //     this.messages = messages;
        // });
        // this.messagesService.getMessages().subscribe(res => {
        //     this.messages = res;
        // });
    }
}
