import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../../services/recipe.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  currentRecipe?: Recipe;
  editMode = false;
  thisForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentRecipe = this.recipeService.getRecipe(params['name']);
    });

    (this.router.url === '/recipes/new') ? this.editMode = true : this.editMode = false;

    this.thisForm = new FormGroup({
      'name': new FormControl(),
      'imageUrl': new FormControl(),
      'description': new FormControl(),
      'ingredientName': new FormArray([]),
      'amount': new FormControl()
    });
  }

  onSubmit() {
    console.log('submitted!');
  }

}
