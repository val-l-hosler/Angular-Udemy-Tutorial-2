import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsAdded = new Subject<Ingredient>();
  ingredientsDeleted = new Subject<Ingredient>();
  ingredientsEdited = new Subject<Ingredient>();
  clickedIngredient = new Subject<Ingredient>();

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

  addIngredient(addedIngredient: Ingredient) {
    let matchingIngredientFlag = false;
    let oldAmount;

    this.ingredients.forEach((ingredient) => {
      if (addedIngredient.name === ingredient.name) {
        matchingIngredientFlag = true;
        oldAmount = ingredient.amount;
      }
    });

    (!matchingIngredientFlag) ?
      (this.ingredients.push(addedIngredient)) :
      (this.editIngredient(new Ingredient(addedIngredient.name, parseInt(addedIngredient.amount + oldAmount))));
  }

  editIngredient(editedIngredient: Ingredient) {
    this.ingredients.forEach((ingredient) => {
      if (editedIngredient.name === ingredient.name) {
        ingredient.amount = editedIngredient.amount;
      }
    });
  }

  sentIngredients(recipeIngredients: Ingredient[]) {
    this.ingredients.push(...recipeIngredients);
  }

  deleteIngredient(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);
    (index > -1) ? this.ingredients.splice(index, 1) : null;
  }
}
