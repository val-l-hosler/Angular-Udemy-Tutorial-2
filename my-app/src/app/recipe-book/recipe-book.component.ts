import {Component, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from '../services/recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  parentRecipe!: Recipe;

  // This makes it so all the child components use the same instance of the service
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      // subscribe() means you get informed of any changed
      (recipe: Recipe) => {
        this.parentRecipe = recipe;
      }
    )
  }


}
