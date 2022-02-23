import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  // ViewChild has to access the element directly inside it
  @ViewChild('nameInput', {static: false}) primaryNameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) primaryAmountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  addOnClick(): void {
    this.shoppingListService.ingredientsAdded.emit(
      new Ingredient(
        this.primaryNameInput.nativeElement.value,
        this.primaryAmountInput.nativeElement.value
      ));

    /* Option 2
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.primaryNameInput.nativeElement.value,
        this.primaryAmountInput.nativeElement.value
      ));
     */
  }
}
