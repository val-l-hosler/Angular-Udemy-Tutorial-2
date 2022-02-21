import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() childRecipe!: Recipe;
  @Output() recipeClickedEvent = new EventEmitter<void>(); // This passes it to the next parent component. We aren't passing in a recipe because we already have access to it in the parent's for loop.

  constructor() {
  }

  ngOnInit(): void {
  }

  recipeClicked(): void {
    this.recipeClickedEvent.emit();
  }

}
