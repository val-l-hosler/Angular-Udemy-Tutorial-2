import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../services/recipe.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  parentRecipes: Recipe[] = []
  updatedRecipeList: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.parentRecipes = this.recipeService.getRecipes();

    this.updatedRecipeList = this.recipeService.updatedRecipeList.subscribe((recipes) => {
      this.parentRecipes = recipes;
    });
  }

  ngOnDestory() {
    this.updatedRecipeList.unsubscribe();
  }
}
