import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs';

import {ShoppingListService} from '../services/shopping-list.service';
import {AuthService} from '../services/auth.service';

import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  index: number;

  private addIngredientSub: Subscription;
  private deleteIngredientSub: Subscription;
  private clickedIngredientSub: Subscription;
  private editIngredientSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.authService.getPreviousPath(this.route.parent.url);

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

    this.clickedIngredientSub = this.shoppingListService.clickedIngredient.subscribe((ingredient) => {
      const names = this.ingredients.map((mappedIngredient) => mappedIngredient.name);
      this.index = names.indexOf(ingredient.name);
    })

    this.editIngredientSub = this.shoppingListService.ingredientsEdited.subscribe((ingredient) => {
      this.shoppingListService.editIngredient(ingredient, this.index);
      this.ingredients = this.shoppingListService.getIngredients();
    });
  }

  ngOnDestroy() {
    this.addIngredientSub.unsubscribe();
    this.deleteIngredientSub.unsubscribe();
    this.clickedIngredientSub.unsubscribe();
    this.editIngredientSub.unsubscribe();
  }

  onIngredientClick(ingredient: Ingredient) {
    this.shoppingListService.clickedIngredient.next(ingredient);
  }
}
