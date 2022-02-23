import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
// Manage ingredients
// Add an addIngredients()

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsAdded = new EventEmitter<Ingredient>();
  ingredientsReplaced = new EventEmitter<Ingredient[]>();
  // Option 2 ingredientsAdded2 = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() {
  }

  getIngredients(): Ingredient[] {
    // returns a copy of the array so the OG is not edited
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // Option 2 this.ingredientsAdded2.emit(this.ingredients.slice());
  }

  sentIngredients(recipeIngredients: Ingredient[]) {
    this.ingredients.push(...recipeIngredients);
  }
}
