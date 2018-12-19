import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessagesService, Message, User } from 'src/app/messages/messages.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-messages',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css'],
})
export class MessagesComponent implements OnInit, OnChanges {
    messages: Message[];
    results = [];
    searchTerm$ = new Subject<string>();
    user: User;
    public myForm: FormGroup;

    constructor(
        public messagesService: MessagesService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }
    ngOnChanges(changes: SimpleChanges) {
        this.myForm.reset();
    }

    ngOnInit() {
        this.messagesService.search(this.searchTerm$)
            .subscribe(res => {
            this.results = res.results;
        });
        this.setupForm();
        this.getUser();
        this.getMessages();
    }

    resultsName(result) {
        return `${result.name}`;
    }

    getUser() {
        this.messagesService.getUser().subscribe(res => {
            this.user = res;
        });
    }

    setupForm() {
        this.myForm = this.fb.group({
            firstName : '',
          });
    }

    getMessages() {
        this.messagesService.getMessages(this.user).subscribe(res => {
            this.messages = res;
        });
    }

    onSubmit() {
        const name = this.myForm.get('firstName').value.name;
         console.log(name);
     }
}
