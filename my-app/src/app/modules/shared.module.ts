import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {DropdownDirective} from '../shared/dropdown/dropdown.directive';

import {LoadingSpinnerComponent} from '../shared/loading-spinner/loading-spinner.component';
import {AlertComponent} from '../shared/alert/alert.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective
  ],
  exports: [
    DropdownDirective
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class SharedModule {
}
