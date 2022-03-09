import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../services/data-storage.service';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isLoggedIn = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      (user) ? this.isLoggedIn = true : this.isLoggedIn = false;
      // or this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.user.next(null);
    this.authService.logout();
  }
}
