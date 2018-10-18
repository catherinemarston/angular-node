import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    template: `<app-new-message></app-new-message>
    <app-messages></app-messages>`,
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
