import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { map,filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = environment.server;
  public user: Observable<any>;
  public authenticationState = new BehaviorSubject(null);

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public router: Router
  ) {
    this.user = this.authenticationState.asObservable().pipe(
      filter(response => response)
    );
  }

  loadUser()
  {
    console.log('Load User Called');
    let token = '';
    this.storage.get('token').then((tk) =>
    {
      token = tk
      if(token!=null)
      {
        this.authenticationState.next({ 'token': token });
        this.router.navigateByUrl('/home');
      }
      else
      {
        this.authenticationState.next(null);
      }
      console.log(this.authenticationState.value);
    });
  }

  login(email,password) : Observable<any>{
    const body = {
      email: email,
      password: password
    };
    return this.http.post(`${this._url}/user/login`, body).pipe(map(
      user =>
      {
        if(user['token'])
        {
          this.storage.set('token',user['token']);
          this.authenticationState.next({ token: user['token'] });
        }
      }
    ));
  }

  register(user) : Observable<any>{
    const body = {
      user: user
    };
    return this.http.post(`${this._url}/user/register`, body);
  }

  isNewUser()
  {
    return this.http.get(`${this._url}/user/isNewUser`);
  }

  async logout()
  {
    await this.storage.set('token',null);
    this.authenticationState.next(null);
  }

  isAuthenticated()
  {
    return this.authenticationState.value;
  }
}