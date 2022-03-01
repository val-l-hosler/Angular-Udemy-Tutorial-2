import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RecipeBookComponent} from '../recipe-book/recipe-book.component';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {RecipeDetailComponent} from '../recipe-book/recipe-detail/recipe-detail.component';
import {EmptyDetailComponent} from '../recipe-book/empty-detail/empty-detail.component';
import {RecipeEditComponent} from '../recipe-book/recipe-edit/recipe-edit.component';

const appRoutes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'shopping-list', component: ShoppingListComponent, children: [
      {path: ':name', component: ShoppingListComponent}
    ]
  },
  {
    path: 'recipes', component: RecipeBookComponent, children: [
      {path: '', component: EmptyDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':name', component: RecipeDetailComponent},
      {path: ':name/edit', component: RecipeEditComponent},
    ]
  }
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
