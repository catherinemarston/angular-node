import { Component, ViewChild } from '@angular/core';
import { MessagesComponent } from 'src/app/messages/message.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Message Board';
}
