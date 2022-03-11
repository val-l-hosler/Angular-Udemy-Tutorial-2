import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs';

import {ShoppingListService} from '../../services/shopping-list.service';
import {AuthService} from '../../services/auth.service';

import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  clickedIngredient: Ingredient;
  getClickedIngredient: Subscription;
  clickedIngredientFlag = false;
  @ViewChild('thisForm') form: NgForm;

  constructor(private shoppingListService: ShoppingListService, private router: Router,
              private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.authService.getPreviousPath(this.route.parent.url);

    this.getClickedIngredient = this.shoppingListService.clickedIngredient.subscribe((ingredient) => {
        this.clickedIngredient = ingredient;
        this.clickedIngredientFlag = true;
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.getClickedIngredient.unsubscribe();
  }

  onAddIngredient() {
    this.shoppingListService.ingredientsAdded.next(
      new Ingredient(
        this.form.value.name,
        this.form.value.amount
      ));

    this.onClear();
  }

  onEditIngredient() {
    this.shoppingListService.ingredientsEdited.next(
      new Ingredient(
        this.form.value.name,
        this.form.value.amount
      ));

    this.onClear();
  }

  onClear() {
    this.router.navigate(['/shopping-list']);
    this.clickedIngredientFlag = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.ingredientsDeleted.next(this.clickedIngredient);
    this.onClear();
  }
}
