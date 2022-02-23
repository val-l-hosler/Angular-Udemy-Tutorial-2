import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    // Do all initializations and any other "heavy lifting" in ngOnInit
    this.ingredients = this.shoppingListService.getIngredients();

    // This updates the ingredients arr when a change occurs in the event emitter
    this.shoppingListService.ingredientsAdded.subscribe((ingredient) => {
      this.shoppingListService.addIngredient(ingredient);
      this.ingredients = this.shoppingListService.getIngredients();
    });

    /* Option 2
    this.shoppingListService.ingredientsAdded2.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
     */
  }
}
