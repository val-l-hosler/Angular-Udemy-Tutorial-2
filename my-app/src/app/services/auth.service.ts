import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

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

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    // need to replace [API_KEY] with our firebase's API key
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4ya6xFXvuo2-x-mqBo-S2GqPgHRNzuP4', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        catchError((errResponse) => {
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
              }

              return throwError(() => errorMessage);
            } else {
              return throwError(errResponse);
            }
          }
        ));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4ya6xFXvuo2-x-mqBo-S2GqPgHRNzuP4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError((errResponse) => {
          let errorMessage = 'An unknown error occurred.';

          if (errResponse.error.error.message) {
            switch (errResponse.error.error.message) {
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
            return throwError(errResponse);
          }
        }
      ));
  }
}
