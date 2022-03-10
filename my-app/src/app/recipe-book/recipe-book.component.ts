import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {RecipeService} from '../services/recipe.service';
import {AuthService} from '../services/auth.service';

import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  clickedRecipe?: Recipe;

  // This makes it so all the child components use the same instance of the service
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getPreviousPath(this.route.parent.url);

    this.route.params.subscribe(
      // subscribe() means you get informed of any changes
      (params) => {
        let name = params.name;
        this.clickedRecipe = this.recipeService.getRecipe(name);
      }
    );
  }
}
