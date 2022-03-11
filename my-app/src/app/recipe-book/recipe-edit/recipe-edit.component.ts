import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {RecipeService} from '../../services/recipe.service';
import {AuthService} from '../../services/auth.service';

import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  currentRecipe: Recipe;
  editMode = false;
  thisForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getPreviousPath(this.route.url);

    this.thisForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });

    this.route.params.subscribe((params) => {
      this.currentRecipe = this.recipeService.getRecipe(params['name']);

      (this.router.url === '/recipes/new') ? this.editMode = false : this.editMode = true;

      if (this.editMode === true) {
        if (this.currentRecipe['ingredients']) {
          this.thisForm.patchValue({
            'name': this.currentRecipe.name,
            'imageUrl': this.currentRecipe.imagePath,
            'description': this.currentRecipe.description
          });

          this.thisForm.addControl('ingredientsArr', this.populateIngredients());
        }
      } else {
        this.currentRecipe = new Recipe('', '', '', []);
        this.thisForm.addControl('ingredientsArr', new FormArray([]));
      }
    });
  }

  populateIngredients(): FormArray {
    let ingredients = new FormArray([]);

    this.currentRecipe['ingredients'].forEach((ingredient) => {
      ingredients.push(new FormGroup({
        'name': new FormControl(ingredient.name, Validators.required),
        'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
      }));
    });

    return ingredients;
  }

  consolidateIngredients(ingredients): Ingredient[] {
    const jsonIngredients = [];

    ingredients.forEach((ingredient) => {
      let object = {};

      ingredients
        .filter((filteredIngredient) => ingredient.name === filteredIngredient.name)
        .forEach((ingredient) => {
          if (object.hasOwnProperty('amount')) {
            object['amount'] = object['amount'] + ingredient.amount;
          }

          if (!object.hasOwnProperty('name')) {
            object['name'] = ingredient.name;
            object['amount'] = ingredient.amount;
          }
        });

      const jsonify = JSON.stringify(object);
      const findItem = jsonIngredients.indexOf(jsonify);

      if (findItem === -1) {
        jsonIngredients.push(jsonify);
      }
    });

    return jsonIngredients.map((ingredient) => JSON.parse(ingredient));
  }

  onSubmit() {
    const name = this.thisForm.get('name').value;
    const url = this.thisForm.get('imageUrl').value;
    const description = this.thisForm.get('description').value;
    const ingredients = this.thisForm.get('ingredientsArr').value;

    this.recipeService.saveRecipe(new Recipe(name, description, url, this.consolidateIngredients(ingredients)), this.currentRecipe);
  }

  onAddIngredient() {
    (this.thisForm.get('ingredientsArr') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)])
    }));
  }

  onDeleteIngredient(index) {
    (this.thisForm.get('ingredientsArr') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.currentRecipe);
    this.router.navigate(['/recipes']);
  }

  get controls() {
    return (this.thisForm.get('ingredientsArr') as FormArray).controls;
  }
}
