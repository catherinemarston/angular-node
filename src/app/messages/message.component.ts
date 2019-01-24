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
    messages;
    user: User;
    lowerName: string;
    public myForm: FormGroup;

    constructor(
        public messagesService: MessagesService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.myForm.reset();
    }

    ngOnInit() {
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
        const name = this.route.snapshot.params.name;
        this.messagesService.getMessages(name).subscribe();
        // this.messagesService.messageSubject.subscribe(messages => this.messages = messages);
        // EXPLANATION: we want the message subject to be private so no component can call next on it
        // so we create a messages observable from the message subject and were subscribing to that
        this.messagesService.messages.subscribe(messages => this.messages = messages);
        console.log(this.messages);
    }

    onSubmit() {
        const name = this.myForm.get('firstName').value.name;
         console.log(name);
     }
}
