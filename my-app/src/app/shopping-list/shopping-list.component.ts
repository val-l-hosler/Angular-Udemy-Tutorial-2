import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../services/shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private addIngredientSub: Subscription;
  private deleteIngredientSub: Subscription;
  private editIngredientSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    // Have to initially set this so the default values show
    this.ingredients = this.shoppingListService.getIngredients();

    // This updates the ingredients arr when a change occurs in the event emitter
    // Remember to set this to a var, so you can also unsubscribe()
    this.addIngredientSub = this.shoppingListService.ingredientsAdded.subscribe((ingredient) => {
      this.shoppingListService.addIngredient(ingredient);
      this.ingredients = this.shoppingListService.getIngredients();
    });

    this.deleteIngredientSub = this.shoppingListService.ingredientsDeleted.subscribe((ingredient) => {
      this.shoppingListService.deleteIngredient(ingredient);
      this.ingredients = this.shoppingListService.getIngredients();
    });

    this.editIngredientSub = this.shoppingListService.ingredientsEdited.subscribe((ingredient) => {
      this.shoppingListService.editIngredient(ingredient);
      this.ingredients = this.shoppingListService.getIngredients();
    });
  }

  ngOnDestroy() {
    this.addIngredientSub.unsubscribe();
    this.deleteIngredientSub.unsubscribe();
    this.editIngredientSub.unsubscribe();
  }

  onIngredientClick(ingredient: Ingredient) {
    this.shoppingListService.clickedIngredient.next(ingredient);
  }
}
