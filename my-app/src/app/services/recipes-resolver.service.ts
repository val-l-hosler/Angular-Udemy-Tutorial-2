import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {DataStorageService} from './data-storage.service';
import {RecipeService} from './recipe.service';

import {Recipe} from '../recipe-book/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // so the recipes are fetched first before every time you are on certain routes
    return (this.recipeService.getRecipes().length === 0) ? this.dataStorageService.fetchRecipes() : this.recipeService.getRecipes();
  }
}
