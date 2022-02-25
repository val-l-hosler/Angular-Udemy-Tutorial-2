import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  parentRecipes: Recipe[] = []

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.parentRecipes = this.recipeService.getRecipes();
  }
}
