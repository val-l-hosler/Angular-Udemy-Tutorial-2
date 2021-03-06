import {Injectable} from '@angular/core';

import {Subject} from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';

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
    if (localStorage.getItem('shoppingListIngredients')) {
      this.ingredients = JSON.parse(localStorage.getItem('shoppingListIngredients'));
    }

    return this.ingredients.slice();
  }

  addIngredient(addedIngredient: Ingredient) {
    let matchingIngredientFlag = false;
    let oldAmount;
    let index;

    for (let i = 0; i < this.ingredients.length; i++) {
      if (addedIngredient.name === this.ingredients[i].name) {
        matchingIngredientFlag = true;
        oldAmount = this.ingredients[i].amount;
        index = i;
      }
    }

    (!matchingIngredientFlag) ?
      (this.ingredients.push(addedIngredient)) :
      (this.editIngredient(new Ingredient(addedIngredient.name, parseInt(addedIngredient.amount + oldAmount)), index));

    localStorage.setItem('shoppingListIngredients', JSON.stringify(this.ingredients));
  }

  editIngredient(editedIngredient: Ingredient, index: number) {
    this.ingredients[index] = new Ingredient(editedIngredient.name, editedIngredient.amount);
    localStorage.setItem('shoppingListIngredients', JSON.stringify(this.ingredients));
  }

  sentIngredients(recipeIngredients: Ingredient[]) {
    let updatedRecipeIngredients = [...recipeIngredients];

    for (let i = 0; i < updatedRecipeIngredients.length; i++) {
      for (let j = 0; j < this.ingredients.length; j++) {
        if (updatedRecipeIngredients[i].name === this.getIngredients()[j].name) {
          let updatedAmount = updatedRecipeIngredients[i].amount + this.getIngredients()[j].amount;
          this.ingredients[j] = new Ingredient(updatedRecipeIngredients[i].name, updatedAmount)
          updatedRecipeIngredients.splice(i, 1);
        }
      }
    }

    this.ingredients.push(...updatedRecipeIngredients);
  }

  deleteIngredient(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);
    (index > -1) ? this.ingredients.splice(index, 1) : null;
    localStorage.setItem('shoppingListIngredients', JSON.stringify(this.ingredients));
  }
}
