import {Component, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {RecipeService} from '../../services/recipe.service';

import {Recipe} from '../recipe.model';

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
      this.recipeService.saveUpdatedRecipes(recipes);
      this.parentRecipes = recipes;
    });
  }

  ngOnDestory() {
    this.updatedRecipeList.unsubscribe();
  }
}
