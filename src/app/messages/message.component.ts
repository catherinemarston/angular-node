import { Component, OnInit } from '@angular/core';
import { MessagesService, Message, User } from 'src/app/messages/messages.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-messages',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
})
export class MessagesComponent implements OnInit {
    messages;
    results;
    searchTerm$ = new Subject<string>();
    user: User;
    public model: any;
    public myForm: FormGroup;

    constructor(
        public messagesService: MessagesService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.messagesService.search(this.searchTerm$)
        .subscribe(res => {
          this.results = res.results;
        });
    }

    ngOnInit() {
        // const name = this.route.snapshot.params.name;
        // this.messagesService.getMessages(name);
        this.myForm = this.fb.group({
            name : '',
          });

        this.messagesService.getUser().subscribe(res => {
            this.user = res;
        });

        // this.messagesService.messages.subscribe(messages => {
        //     this.messages = messages;
        // });
        this.messagesService.getMessages(this.user).subscribe(res => {
            this.messages = res;
        });
    }

    onSubmit(name: User) {
        console.log(name);
    }
}
