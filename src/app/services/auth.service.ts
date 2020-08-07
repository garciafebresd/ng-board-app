import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api/v1';
  // private API_KEY = 'AIzaSyDQDoNn3swVlrNokqOL-Q8EcfevvBiwQxg';
  private user: UserModel;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  //CREAR USUARIO
  login(usuario: LoginModel) {

    const dataLogin = {
      user: {
        email: usuario.email,
        password: usuario.password
      }
    };

    // const requestUrl = `${this.url}signInWithPassword?key=${this.API_KEY}`;
    const requestUrl = `${this.url}/users/sign_in`;

    return this.requestPost(requestUrl, dataLogin);
  }

  //LOGIN USUARIO
  register(usuario: UserModel) {
    const dataRegister = {
      user: {
        email: usuario.email,
        password: usuario.password,
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        username: usuario.username
      }
    };

    const requestUrl = `${this.url}/users`;

    return this.requestPost(requestUrl, dataRegister);
  }


  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {

    if (!this.user) {
      return false;
    }

    return true;
  }


  private setToken(user: UserModel) {

    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));

    const today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expiresAt', today.getTime().toString());

  }

  private getToken() {

    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.user = null;
    }

    return this.user;

  }

  requestPost(requestUrl: string, objectData: any) {

    return this.http.post<UserModel>(requestUrl, objectData)
      .pipe(
        map(response => {

          console.log('HEADERS', response)

          this.setToken(response);
          return response;

        })
      );

  }

}
