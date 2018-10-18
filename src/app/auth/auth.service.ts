import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    BASE_URL = 'http://localhost:63145/auth';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private route: Router) {}

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated(): Boolean {
        if (localStorage.getItem(this.TOKEN_KEY)) {
            return true;
        }
        return false;
    }

    login(loginData) {
        this.http
            .post<any>(this.BASE_URL + '/login', loginData)
            .subscribe(res => {
                console.log(res);
            });
    }
    register(user) {
        this.http
            .post<any>(this.BASE_URL + '/register', user)
            .subscribe(res => {
                console.log(res);
                if (!res.token) {
                    return;
                }
                localStorage.setItem(this.TOKEN_KEY, res.token);
                localStorage.setItem(this.NAME_KEY, res.firstName);
                this.route.navigate(['/']);
            });
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.NAME_KEY);
    }
}
