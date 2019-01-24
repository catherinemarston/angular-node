import { Component, OnInit } from '@angular/core';
import { LibrariesService } from 'src/app/libraries/libraries.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-libraries',
    templateUrl: './libraries.component.html',
    styleUrls: ['./libraries.component.css']
})
export class LibrariesComponent implements OnInit {
    results = [];
    searchTerm$ = new Subject<string>();
    constructor(public librariesService: LibrariesService) { }

    ngOnInit() {
        this.librariesService.search(this.searchTerm$)
        .subscribe(res => {
            this.results = res.results;
        });
    }

}
