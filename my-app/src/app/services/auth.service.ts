import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {BehaviorSubject, catchError, take, tap, throwError} from 'rxjs';

import {User} from '../auth/user.model';

import {environment} from '../../environments/environment';

export interface AuthResponseData {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // also gives us access to the previously emitted subject
  user = new BehaviorSubject<User>(null);
  currentUrl = new BehaviorSubject<string>(null);
  // hasErrorAlert = new Subject<boolean>();

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    // need to replace [API_KEY] with our firebase's API key
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError(this.handleError),
      tap((responseData) => {
        this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      })
    );
  }

  autoLogin() {
    // parses the string val into a JS object
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    // .token is the getter
    if (loadedUser.token) {
      this.user.next(loadedUser);
      // getTime() returns the time in millisecs
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.router.navigate(['/']);
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
    }
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuth(email: string, localId: string, idToken: string, expiresIn: number) {
    // this gets a date where it's the current timestamp as a num in millisecs + expiresIn which is the time in seconds in the future it will expire
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const newUser = new User(email, localId, idToken, expirationDate);
    this.user.next(newUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleError(errResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';

    if (errResponse.error.error.message) {
      switch (errResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid or the user does not have a password.';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled by an administrator.';
          break;
      }

      return throwError(() => errorMessage);
    } else {
      return throwError(() => errResponse);
    }
  }

  getPreviousPath(routeUrl) {
    routeUrl
      .pipe(take(1))
      .subscribe((url) => {
        this.currentUrl.next(`/${url[0].path}`);
      });
  }
}
