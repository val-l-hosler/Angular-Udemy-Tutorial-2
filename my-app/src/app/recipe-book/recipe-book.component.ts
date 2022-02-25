import {Component, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from '../services/recipe.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  clickedRecipe?: Recipe;

  // This makes it so all the child components use the same instance of the service
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      // subscribe() means you get informed of any changes
      (params) => {
        let name = params.name;
        this.clickedRecipe = this.recipeService.getRecipe(name);
      }
    );
  }
}
