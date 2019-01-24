
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class LibrariesService {
    apiUrl = 'https://api.cdnjs.com/libraries';
    queryUrl = '?search=';
    res: Object;

    constructor(private http: HttpClient, private auth: AuthService) {}

    search(terms) {
        return terms.pipe(debounceTime(400),
          distinctUntilChanged(),
          switchMap(res => this.searchEntries(res)));
      }

      searchEntries(term) {
        return this.http
          .get<any>(this.apiUrl + this.queryUrl + term).pipe(
            map(res => this.res = res)
          );
      }
  }
