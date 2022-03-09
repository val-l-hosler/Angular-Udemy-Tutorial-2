import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';
import {AuthService} from '../../services/auth.service';

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
    this.route.url
      .pipe(take(1))
      .subscribe((url) => {
        this.authService.currentUrl.next(`/${url[0].path}`);
      });

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
