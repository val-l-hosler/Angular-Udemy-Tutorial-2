import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {ShoppingListEditComponent} from '../shopping-list/shopping-list-edit/shopping-list-edit.component';

import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ShoppingListModule {
}
