import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Subject} from 'rxjs';

import {Recipe} from '../recipe-book/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Store the recipe data
  // private recipes: Recipe[] = [
  //   new Recipe('A Test Recipe',
  //     'This is a test',
  //     'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
  //     [new Ingredient('Corn', 5), new Ingredient('Jello', 2)]),
  //   new Recipe('A Test Recipe 2',
  //     'This is a test 2',
  //     'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
  //     [new Ingredient('Pie', 10), new Ingredient('Cake', 1)])
  // ];

  private recipes: Recipe[] = [];

  updatedRecipeList = new Subject<Recipe[]>();

  constructor(private router: Router) {
  }

  getRecipes(): Recipe[] {
    // if you return it like this, you can directly change something on the service
    // return this.recipes;

    return this.recipes.slice(); // this returns a new array that is a copy of the OG array
  }

  setRecipes(recipeArr: Recipe[]) {
    this.recipes = recipeArr;
  }

  getRecipe(name: string): Recipe {
    let selectedRecipe: Recipe;

    this.recipes.forEach((recipe) => {
      if (recipe.name === name) {
        selectedRecipe = recipe;
      }
    })

    return selectedRecipe;
  }

  saveRecipe(recipe: Recipe, oldRecipe: Recipe) {
    let index = -1;

    for (let i = 0; i < this.recipes.length; i++) {
      if (oldRecipe.name === this.recipes[i].name) {
        index = i;
        break;
      }
    }

    (index > -1) ? this.recipes[index] = recipe : this.addRecipe(recipe);

    this.updatedRecipeList.next(this.getRecipes());
    this.router.navigate(['/recipes']);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  deleteRecipe(recipe: Recipe) {
    let index = this.getRecipes().indexOf(recipe);
    this.recipes.splice(index, 1);
    this.updatedRecipeList.next(this.getRecipes());
  }

  saveUpdatedRecipes(recipes) {
    localStorage.setItem('currentRecipes', JSON.stringify(recipes));
  }
}
