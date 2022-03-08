import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from '../services/auth.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggedIn = true;
  isLoading = false;
  hasError = false;
  signUpSuccess = false;
  loginSuccess = false;

  error = new Subject<string>();
  errorMessage: string = null;

  success = new Subject<string>();
  successMessage: string = null;

  submitButtonText = '';
  buttonText = '';

  authOpObservable = new Observable<AuthResponseData>();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setButtonText();

    this.error.subscribe((value) => {
      this.errorMessage = value;
    });

    this.success.subscribe((value) => {
      this.successMessage = value;
      (this.successMessage === 'You have successfully signed up.') ? this.signUpSuccess = true : this.loginSuccess = true;
    });
  }

  ngOnDestroy() {
    this.error.unsubscribe();
    this.success.unsubscribe();
  }

  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
    this.setButtonText();
    this.clearMessages();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    if (!this.isLoggedIn) {
      this.authOpObservable = this.authService.signUp(form.value.email, form.value.password)
    } else {
      this.authOpObservable = this.authService.login(form.value.email, form.value.password);
    }

    // Split it up like this, so you don't repeat code
    this.authOpObservable
      .subscribe({
        next: (responseData) => {
          (responseData.registered) ?
            this.success.next('You have successfully logged in.') :
            this.success.next('You have successfully signed up.');

          this.isLoading = false;
          this.hasError = false;
        },
        error: (errorMessage) => {
          // moved the logic into the service where the error is an observable with the message
          this.error.next(errorMessage);
          this.isLoading = false;
          this.hasError = true;
        },
        complete: () => console.log('HTTP request completed.')
      });

    form.reset();
  }

  clearMessages() {
    this.isLoading = false;
    this.hasError = false;
    this.loginSuccess = false;
    this.signUpSuccess = false;
  }

  setButtonText() {
    if (this.isLoggedIn) {
      this.submitButtonText = 'Login';
      this.buttonText = 'Switch to Sign Up';
    } else {
      this.submitButtonText = 'Sign Up';
      this.buttonText = 'Switch to Login';
    }
  }
}
