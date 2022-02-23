import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../recipe-book/recipe.model';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // This gets info from the child to the parent
  recipeSelected = new EventEmitter<Recipe>();

  // Store the recipe data
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe',
      'This is a test',
      'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
      [new Ingredient('Corn', 5), new Ingredient('Jello', 2)]),
    new Recipe('A Test Recipe 2',
      'This is a test 2',
      'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
      [new Ingredient('Pie', 10), new Ingredient('Cake', 1)])
  ];

  constructor() {
  }

  getRecipes(): Recipe[] {
    // if you return it like this, you can directly change something on the service
    // return this.recipes;

    return this.recipes.slice(); // this returns a new array that is a copy of the OG array
  }
}
