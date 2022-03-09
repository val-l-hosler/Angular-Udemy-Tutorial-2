import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {RecipesResolverService} from '../services/recipes-resolver.service';
import {AuthComponent} from '../auth/auth.component';
import {AuthGuard} from "../auth/auth.guard";

import {RecipeBookComponent} from '../recipe-book/recipe-book.component';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {RecipeDetailComponent} from '../recipe-book/recipe-detail/recipe-detail.component';
import {EmptyDetailComponent} from '../recipe-book/empty-detail/empty-detail.component';
import {RecipeEditComponent} from '../recipe-book/recipe-edit/recipe-edit.component';

const appRoutes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {
    path: 'shopping-list', component: ShoppingListComponent, children: [
      {path: ':name', component: ShoppingListComponent}
    ]
  },
  {
    path: 'recipes', canActivate: [AuthGuard], component: RecipeBookComponent, children: [
      {path: '', component: EmptyDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':name', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':name/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
  {path: 'auth', component: AuthComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
