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
  private idChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    // Do all initializations and any other "heavy lifting" in ngOnInit
    this.ingredients = this.shoppingListService.getIngredients();

    // This updates the ingredients arr when a change occurs in the event emitter
    // Remember to set this to a var so you can also unsubscribe()
    this.idChangeSub = this.shoppingListService.ingredientsAdded.subscribe((ingredient) => {
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

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }
}
