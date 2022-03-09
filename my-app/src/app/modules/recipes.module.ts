// Make sure you import the angular modules you need too
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {RecipeListComponent} from '../recipe-book/recipe-list/recipe-list.component';
import {RecipeItemComponent} from '../recipe-book/recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from '../recipe-book/recipe-detail/recipe-detail.component';
import {RecipeBookComponent} from '../recipe-book/recipe-book.component';
import {RecipeEditComponent} from '../recipe-book/recipe-edit/recipe-edit.component';
import {EmptyDetailComponent} from '../recipe-book/empty-detail/empty-detail.component';

import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeBookComponent,
    RecipeEditComponent,
    EmptyDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class RecipesModule {
}
