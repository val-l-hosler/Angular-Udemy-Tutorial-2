import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../recipe.model";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() childRecipe!: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  recipeClicked(): void {
    // This emits the child recipe to the service
    this.recipeService.recipeSelected.emit(this.childRecipe);
  }

}
