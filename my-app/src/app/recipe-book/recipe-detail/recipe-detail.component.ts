import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ShoppingListService} from '../../services/shopping-list.service';
import {RecipeService} from '../../services/recipe.service';
import {AuthService} from '../../services/auth.service';

import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe?: Recipe;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getPreviousPath(this.route.url);

    this.route.params.subscribe((params) => {
      let name = params.name;
      this.recipe = this.recipeService.getRecipe(name);
      // (this.recipe) ? null : this.router.navigate(['./']);
    });
  }

  onClickSendToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.sentIngredients(ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe);
  }
}
