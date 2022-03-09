import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from './recipe.service';
import {exhaustMap, map, take, tap} from 'rxjs';
import {Recipe} from '../recipe-book/recipe.model';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-app-16b78-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe();
  }

  fetchRecipes() {
    // to make sure you only call it once
    // could do this ... this.authService.user.subscribe().unsubscribe()
    // take takes one value from the subscription and then automatically unsubscribes

    return this.http.get('https://ng-recipe-app-16b78-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map((responseData) => {
          return (responseData as Recipe[])
            .map((recipe) => {
              // returns a new object with the other recipe key/values, then if ingredients is not defined, set it to an empty array
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap((recipes) => {
          this.recipeService.updatedRecipeList.next(recipes);
          this.recipeService.setRecipes(recipes);
        }));

    // const recipeArr = await firstValueFrom(fetchedRecipes);
    // this.recipeService.updatedRecipeList.next(recipeArr);
    // this.recipeService.setRecipes(recipeArr);
  }
}
