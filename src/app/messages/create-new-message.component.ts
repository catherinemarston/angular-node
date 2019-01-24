import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MessagesService, Message } from 'src/app/messages/messages.service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
    selector: 'app-new-message',
    templateUrl: './create-new-message.component.html',
    styleUrls: ['./message.component.css'],
})
export class CreateNewMessageComponent implements OnInit {
    form: FormGroup;
    // tslint:disable-next-line:no-output-on-prefix
    @Output()
    onPosted = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
    ) {}

    ngOnInit() {
        this.setUpForm();
    }

    setUpForm() {
        this.form = this.fb.group({
            text: '',
            sender: '',
        });
    }

    onSubmit() {
        const name = this.form.get('sender').value;
        const firstName = name.charAt(0).toUpperCase() + name.slice(1);
        const message: Message = {
            text: this.form.value.text,
            sender: firstName,
        };
        this.messagesService.createMessage(message).subscribe();
        // this.onPosted.emit(message);
    }
}
